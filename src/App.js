import React from 'react';
import { useState } from 'react';
import './App.css';
import { Button, Modal, Form, message } from 'antd';
import 'antd/dist/antd.css';




function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexEdit, setIndexEdit] = useState(0)
  const [arr, setArr] = useState([
    { name: 'Làm bài tập', description: "Làm luôn trong ngày hôm nay", deadline: '2022-10-03' }
  ])
  
  let local = JSON.parse(localStorage.getItem('todo'))
  if(local) {
    local = local
  } else {
    local = []
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onFinish = (values) => {
    local[indexEdit] = values
    localStorage.setItem('todo', JSON.stringify(local));
    message.success('Sửa thành công')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Không thành công')
  };

  const add = () => {
    let name = document.querySelector('.input-name').value;
    let des = document.querySelector('.input-des').value;
    let date = document.querySelector('#input-date').value;
    if (!name || !des || !date) {
      message.error("Không được để trống thông tin !!!")
    } else {
      setArr([...arr, { name: name, description: des, deadline: date }])
      const array={
        name: name ,
        description: des,
        deadline: date
      } ;
        local.push(array)
        localStorage.setItem('todo', JSON.stringify(local));
        console.log(local);
      message.success('Thêm thành công')
      document.querySelector('.input-name').value = ''
      document.querySelector('.input-des').value = ''
      document.querySelector('#input-date').value = ''
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="todoList-header">
          <h1>Todo List</h1>
        </div>
        <div className="todoList-input">
          <input type="text" className='input-name' placeholder='Name' />
          <input type="text" className='input-des' placeholder='Description' />
          <input type="date" name="deadline" id="input-date" />
          <Button type="primary" onClick={add}>Add</Button>
        </div>
        <div className="todoList-output">
          {
          local ? 
          local.map((value, index) => {
            
            const deleteBtn = (index) => {
              local.splice(index, 1)
              localStorage.setItem('todo', JSON.stringify(local));
              setArr(...arr)
              
              message.success('Xóa thành công')
            }
            const showModal = () => {
              setIndexEdit(index)
              setIsModalOpen(true);
            };


            return (
              <div className="data" key={index}>
                <div className="data-left">
                  <h1>{value.name}</h1>
                  <p><i>{value.description}</i></p>
                  <p>{value.deadline}</p>
                </div>
                <div className="data-right">
                  <Button type="primary" onClick={() => { showModal() }}>
                    Change
                  </Button>
                  <Button type="primary" danger onClick={() => deleteBtn(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            )
          }):
          ''
          }
        </div>
        <Modal title="Edit Form" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form name="basic" labelCol={{ span: 24, }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Không được để trống',
                },
              ]}
            >
              <input type={Text} id='basic-name' placeholder='Name' style={{ width: "100%", padding: '8px 16px', outline: '0', border: 'none', borderBottom: "1px solid gray" }} />
            </Form.Item>

            <Form.Item
              label=""
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Không được để trống',
                },
              ]}
            >
              <input type={Text} id='basic_description' placeholder='description' style={{ width: "100%", padding: '8px 16px', outline: '0', border: 'none', borderBottom: "1px solid gray" }} />
            </Form.Item>

            <Form.Item
              label=""
              name='deadline'
              rules={[
                {
                  required: true,
                  message: 'Không được để trống',
                },
              ]}
            >
              <input type="date" name="" id="" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default App;