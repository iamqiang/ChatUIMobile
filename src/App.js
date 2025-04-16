import React, { useRef } from'react';
import { useNavigate } from'react-router-dom';
import OpenAI from 'openai';
import { marked } from 'marked';
import hljs from "highlight.js";
import Chat, { MessageProps, useMessages, Bubble, Typing, TypingBubble,Think } from'@chatui/core';
import'@chatui/core/dist/index.css';


const initialMessages = [
  {
    type: 'system',
    content: { text: '您的专属智能客服小蜜 为您服务' },
  },
  {
    type: 'text',
    content: { text: 'Hi，我是你的专属智能助理小蜜，有问题请随时找我哦~' },
    user: {
      avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg',
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '西红柿炒蛋怎么做？',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '我想吃西瓜，怎么办？',
    isNew: true,
  },
  {
    name: '北京在哪里？',
    isHighlight: true,
  },
  {
    name: '谁是TRUMP？',
  },
];

// 这里用 OpenAI 请求大模型来举例子
const client = new OpenAI({
	baseURL: 'https://api.deepseek.com',
	apiKey: 'sk-e426f689a5a947f8965a8f2c38481de5',
	dangerouslyAllowBrowser: true
});

// 解析 markdown
//const renderMarkdown = (content: string) => marked.parse(content) as string;

export default () => {
	// 1. 维护消息列表
	const { messages, appendMsg, updateMsg } = useMessages(initialMessages);
	const typingMsgId_think = useRef('');
	const typingMsgId_answer = useRef('');

	marked.setOptions({
		renderer: new marked.Renderer(),
		highlight: function (code) {
		  return hljs.highlightAuto(code).value;
		},
		gfm: true, // 允许 Git Hub标准的markdown.
		pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
		sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
		tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
		breaks: false, // 允许回车换行（该选项要求 gfm 为true）
		smartLists: true, // 使用比原生markdown更时髦的列表
		smartypants: false, // 使用更为时髦的标点
	  });

	// 2. 发送回调
	async function handleSend(type: string, val: string) {
		if (type === 'text' && val.trim()) {
		  // 2.1. 展示用户侧发送的消息
		  appendMsg({
			type: 'text',
			content: { text: val },
			position: 'right',
		  });

		  // 2.2. 展示「点点点」动效
		  typingMsgId_think.current = appendMsg({
			type: 'typing',
			position: 'left',
		  });


		  // 2.3. 请求大模型
		  const stream = await client.chat.completions.create({
			//model: 'deepseek-chat',
			model: 'deepseek-reasoner',
			messages: [{ role: 'user', content: val }],
			stream: true
		  });

		  let i = 0;
		  let finish_flag = false;
		  let reasoning_content: string = '';
		  let content: string = '';
		  let type: string = '';
		  let thinkTime: int = 0;

		  const startTime = performance.now();
		  try {
			for await (const chunk of stream) {
			  //let finish_flag_cur = '';
			  let reasoning_content_cur = '';
			  let content_cur = '';

			  //finish_flag_cur = chunk.choices[0]?.finish_reason;
			  reasoning_content_cur = chunk.choices[0]?.delta?.reasoning_content;
			  console.log("reasoning_content_cur",reasoning_content_cur);
			  content_cur = chunk.choices[0]?.delta?.content;
			  console.log("content_cur",content_cur);
			  if(reasoning_content_cur){
			  	reasoning_content += reasoning_content_cur || '';
			  }
			  if(content_cur){
				content += content_cur || '';
			  }
			  
			  //思考中
			  if(reasoning_content && reasoning_content_cur){
				  let thinkTime = Math.round((performance.now() - startTime) / 100) / 10;

				  updateMsg(typingMsgId_think.current, {
					  type: 'thinking',
					  content: { text: reasoning_content, thinkTime: thinkTime, isDone: false }
					});
			  }

			  //思考结束
			  if(reasoning_content && ! reasoning_content_cur){
				finish_flag=true;
				if(i===0){
					typingMsgId_answer.current = appendMsg({
						type: 'typing',
						position: 'left'
					  });
				}
				  
				updateMsg(typingMsgId_answer.current, {
					type: 'stream',
					content: { text: content },
					});
				
				i++;
			  }
			}
			
		  } catch (error) {
			console.error("Error in handleSend:", error);
		  }

		  typingMsgId_think.current = '';
		  typingMsgId_answer.current = '';
		}
	  }

	function renderMessageContent(msg: MessageProps) {
		const { type, content } = msg;

		// 3. 根据类型渲染消息气泡
		switch (type) {
		  case 'text':
			return <Bubble data-animation='fadeInUp' content={content.text} />;
		  case 'stream':
		    let textstr = marked.parse(content.text);
			//let textstr = content.text;
			return (
			  <TypingBubble
				content={textstr}
				isRichText
				options={{ step: [1, 10], interval: 20 }}
			  />
			);
		  case 'typing':
			return <Typing />;
		  case 'thinking':
			return (
				<Bubble>
			  <Think
				children={content.text}
				thinkTime={content.thinkTime}
				isDone={content.isDone}
			  />
			  </Bubble>
			);
		  default:
			return null;
		}
	  }

	// 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
	function handleQuickReplyClick(item) {
		// 更新点击的快捷短语属性
		const index = defaultQuickReplies.findIndex(reply => reply.name === item.name);
		if (index !== -1) {
		  defaultQuickReplies[index].isNew = false;
		  defaultQuickReplies[index].isHighlight = false;
		}
		handleSend('text', item.name);
	}

	return (
		<Chat
		  navbar={{
			leftContent: {
			  icon: 'chevron-left',
			  title: 'Back',
			  onClick() { },
			},
			title: '智能助理',
		  }}
		  messages={messages}
		  renderMessageContent={renderMessageContent}
		  quickReplies={defaultQuickReplies}
		  onQuickReplyClick={handleQuickReplyClick}
		  onSend={handleSend}
		/>
	  );
};
