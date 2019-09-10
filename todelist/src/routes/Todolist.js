import React, { Component } from 'react';
import { Input, Button, Table, Divider, Popconfirm } from 'antd';

import style from './todolist.scss'
export default class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceIng: [
             
            ],

            columnsIng: [
                {
                    title: '内容',
                    dataIndex: 'text',
                    key: 'key',
                },
                {
                    title: 'Action',
                    dataIndex: 'Action',
                    key: 'action',
                    render: (text, record) => this.state.dataSourceIng.length >= 1 ? (
                        <div>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteIng(record.key)}>
                                <span>
                                    <a>删除</a>
                                </span>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm title="确认完成?" onConfirm={() => this.handleOk(record.key)}>
                                <span>
                                    <a>完成</a>
                                </span>
                            </Popconfirm>
                        </div>
                    ) : null,
                },
            ],
            dataSourceEd: [
             
            ],

            columnsEd: [
                {
                    title: '内容',
                    dataIndex: 'text',
                    key: 'key',
                },

                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => this.state.dataSourceEd.length >= 1 ? (
                        <div>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteEd(record.key)}>
                                <span>
                                    <a>删除</a>
                                </span>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm title="确认移入正在进行?" onConfirm={() => this.handleAgain(record.key)}>
                                <span>
                                    <a>移入正在进行</a>
                                </span>
                            </Popconfirm>
                        </div>
                    ) : null,
                },
            ],
            value: "",
            key: 0,
        }
    }
    submit() {
        let oInputText = document.getElementsByClassName("inputText")[0].value;
        console.log(oInputText)
        var okey = this.state.key;
        this.setState({
            key: okey + 1,
            dataSourceIng: [{ "key": this.state.key, "text": oInputText }, ...this.state.dataSourceIng],
        
        })
        console.log(this.state.key)
    }
    handleDeleteIng = key => {
        const dataSourceIng = [...this.state.dataSourceIng];
        this.setState({ dataSourceIng: dataSourceIng.filter(item => item.key !== key) });
        console.log(key)
    };
    handleOk = key => {
        const dataSourceIng = [...this.state.dataSourceIng];
        let items = this.state.dataSourceIng;
        let text = items.find(item => item.key === key).text
        console.log(items,text)
        this.setState({ dataSourceIng: dataSourceIng.filter(item => item.key !== key)});
        this.setState({
            dataSourceEd: [{ "key": key, "text": text }, ...this.state.dataSourceEd],
        })
    };
    handleDeleteEd = key => {
        const dataSourceEd = [...this.state.dataSourceEd];
        this.setState({ dataSourceEd: dataSourceEd.filter(item => item.key !== key) });
        console.log(key)
    };
   
    handleAgain = (key) => {
        const dataSourceEd = [...this.state.dataSourceEd];
        let items = this.state.dataSourceEd;
        let text = items.find(item => item.key === key).text
        this.setState({ dataSourceEd: dataSourceEd.filter(item => item.key !== key) });
        this.setState({
            dataSourceIng: [{ "key": key, "text": text }, ...this.state.dataSourceIng]
        })
    };
    componentDidMount() {

    }
    render() {
        return (
            <div className={style.todolist}>
                <span className={style.title}>todolist</span>
                <div className={style.a}>
                    <Input placeholder="输入内容" className="inputText" /><Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
                </div>
                <span className={style.title}>正在进行</span>
                <Table dataSource={this.state.dataSourceIng} columns={this.state.columnsIng} />;
                
                <span className={style.title}>已完成</span>
                <Table dataSource={this.state.dataSourceEd} columns={this.state.columnsEd} />;
            </div>

        );
    }
}