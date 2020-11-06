import { Table, Form, Input, Button } from 'antd'

export default function Book () {
    const [form] = Form.useForm()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        }
    ]
    const data = [
        {   
            key: 1,
            name: '张三'
        }, {
            key: 2,
            name: '李四'
        }, {
            key: 3,
            name: '王二'
        }
    ]
    const onFinish = () => {
        
    }
    return (
        <div>
            <Form form={form} layout="inline" onFinish={onFinish}>
                <Form.Item name="name">
                    <Input placeholder="name"></Input>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    <Button
                        type="primay"
                    >
                        Search
                    </Button>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={data}></Table>
        </div>
    )
}