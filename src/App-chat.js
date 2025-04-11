import React from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import './chatui-theme.css';
import OpenAI from "openai";

const initialMessages = [
  {
    type: 'system',
    content: { text: '88VIP专属智能客服小蜜 为您服务' },
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



const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-e426f689a5a947f8965a8f2c38481de5',
		dangerouslyAllowBrowser: true
});

async function main(val) {
	const completion = await openai.chat.completions.create({
	messages: [{ role: "system", "content": "You are a helpful assistant." },
				{"role": "user", "content": val}],
			model: "deepseek-chat",
		});
	console.log(completion.choices[0].message.content);
	return completion.choices[0].message.content;
  
}



export default function() {
  // 消息列表
  const { messages, appendMsg } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

	  const responsestr = main(val);
	  
      // TODO: 发送请求
      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: responsestr },
        });
      }, 1000);
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: '智能助理' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
}