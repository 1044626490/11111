import React from "react";
import { isEmpty } from "../../until/common";
import "./form.less";

import {
  Icon,
  Button,
  InputNumber,
  Form,
  Popconfirm,
  Input,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  Upload
} from "antd";
import locale from "antd/lib/date-picker/locale/zh_CN";
/* import moment from 'moment/locale/zh-cn';
moment.locale('zh-cn'); */
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { MonthPicker, WeekPicker, RangePicker } = DatePicker;

/*定制：通知类型 的 选人子组件 */
class ChoosePerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*定制通知*/
      has_choose_person: [], //保存已选择的人(用于多选+页面渲染)
      no_choose_person: [] //保存未选择的人(页面渲染)
    };
    this.flag = true; //初始化no_choose_person的flag
  }

  // 定制：通知类型————选中一个人
  checkOnePerson(person) {
    let has_tmp = this.state.has_choose_person; //选中数组
    let no_tmp = this.state.no_choose_person; //未选中数组

    has_tmp.push(person); //选中数组中 添加一个
    for (let i in no_tmp) {
      if (no_tmp[i].id == person.id) {
        no_tmp.splice(i, 1); //未选数组中 删除一个
        break;
      }
    }
    this.setState({
      has_choose_person: has_tmp,
      no_choose_person: no_tmp
    });
  }
  // 定制：通知类型————取消选中一个人
  cancelOnePerson(person) {
    let has_tmp = this.state.has_choose_person; //选中数组
    let no_tmp = this.state.no_choose_person; //未选中数组

    no_tmp.push(person); //未选中数组中 添加一个
    for (let i in has_tmp) {
      if (has_tmp[i].id == person.id) {
        has_tmp.splice(i, 1); //选中数组中 删除一个
        break;
      }
    }
    this.setState({
      has_choose_person: has_tmp,
      no_choose_person: no_tmp
    });
  }
  // 定制：通知类型————清空所有人
  checkEmpty() {
    let has_tmp = this.state.has_choose_person; //选中数组
    let no_tmp = this.state.no_choose_person; //未选中数组

    for (let i in has_tmp) {
      no_tmp.push(has_tmp[i]);
    }
    this.setState({
      has_choose_person: [],
      no_choose_person: no_tmp
    });
  }

  render() {
    const { item } = this.props;
    // 给no_choose_person赋值
    if (!isEmpty(item.personList) && this.flag) {
      this.flag = false;
      // 给state 未选择的人赋值
      let has_tmp = this.state.has_choose_person; //选中数组
      let no_tmp = []; //未选中数组

      for (let i in item.personList) {
        let isPush = true;
        for (let j in has_tmp) {
          if (item.personList[i].id == has_tmp[j].id) {
            isPush = false;
            continue;
          }
        }
        if (isPush) {
          no_tmp.push(item.personList[i]); //未选中数组中 添加一个
        }
      }
      this.setState({ no_choose_person: no_tmp });
    }

    return (
      <ul className="person-choose">
        <li>
          <span>
            已选择
            {this.state.has_choose_person.length}人
          </span>
          <span
            className="btn"
            onClick={() => {
              this.checkEmpty();
            }}
            style={{ padding: "2px 12px", cursor: "pointer" }}
          >
            清空
          </span>
          <ul className="person-tag">
            {this.state.has_choose_person.map(item => {
              return (
                <li data-personId={item.id}>
                  {item.name}
                  <i
                      onClick={() => {
                      this.cancelOnePerson(item);
                    }}
                  >
                    ×
                  </i>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <div>
            筛选：
            <input
              type="text"
              onChange={e => {
                item.searchPerson(e.target.value);
                this.flag = true;
              }}
              className="query-person-name"
            />
          </div>
          <ul className="person-tag no-choose">
            {this.state.no_choose_person.map(item => {
              return (
                <li
                    onClick={() => {
                    this.checkOnePerson(item);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    );
  }
}

/**
 * @Component 基础表单组件
 * @author xujing 2018-09-03
 * */
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 验证码
      seconds: 60,
      tipTxt: "点击发送"
    };
    //通知类型子项 气泡框中的值(department,menList)
    this.inform = {};
    //只赋一次选择行初值
    this.flag = true;
    // 没有按钮情况下，表单数据传回父组件
    this.getForm = "";
  }

  componentDidMount() {
    // 没有按钮情况下，表单数据传回父组件
    this.getForm = callback => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        // 若验证通过
        if (!err) {
          // console.log("Received values of form: ", values);

          // 如果有通知类型
          if (!isEmpty(this.inform)) {
            // 如果按人选
            if (this.personInstance) {
              //为通知类型的 选人赋值
              this.inform.menList = this.personInstance.state.has_choose_person.map(
                person => {
                  return person.id;
                }
              );
            }
          }

          //调用回调函数（表单数据传回父组件）
          callback({ ...values, ...this.inform });
        } else {
          // 验证不通过
          callback(false);
        }
      });
    };
  }
  //提交（有提交按钮情况下，表单数据传回父组件）
  handleSubmit(e) {
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // 若验证通过
      if (!err) {
        // console.log("Received values of form: ", values);

        // 如果有通知类型
        if (!isEmpty(this.inform)) {
          // 如果按人选
          if (this.personInstance) {
            //为通知类型的 选人赋值
            this.inform.menList = this.personInstance.state.has_choose_person.map(
              person => {
                return person.id;
              }
            );
          }
        }

        // 调用父组件
        this.props.onOk({ ...values, ...this.inform });
      }
    });
  }

  // 渲染各子表单项
  getField(item) {
    const _this = this;
    const { getFieldDecorator } = this.props.form;

    switch (item.type) {
      case "text":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <Input
            placeholder={item.placeholder}
            disabled={item.disabled}
            onChange={e => {
              item.onChange && item.onChange(e, this.props.form);
            }}
            style={item.itemInputStyle}
          />
        );
        break;
      case "verify":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <Search
            placeholder={item.placeholder}
            disabled={false}
            enterButton={this.state.tipTxt}
            onSearch={(value, e) => {
              item.onSearch(value, function() {
                //(发送验证码)请求成功回调
                e.target.disabled = true; //禁用按钮
                e.target.classname = "disabled";
                // 显示60s倒计时
                const timer = setInterval(() => {
                  _this.setState(
                    preState => {
                      return {
                        seconds: preState.seconds - 1,
                        tipTxt: `${_this.state.seconds - 1}s`
                      };
                    },
                    () => {
                      if (_this.state.seconds < 0) {
                        e.target.disabled = false; //恢复按钮
                        e.target.classname = "";
                        clearInterval(timer);
                        _this.setState({
                          seconds: 60,
                          tipTxt: "点击发送"
                        });
                      }
                    }
                  );
                }, 1000);
              });
            }}
            style={item.itemInputStyle}
            className="verify"
          />
        );
        break;
      case "number":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <InputNumber
            placeholder={item.placeholder}
            disabled={item.disabled}
            min={item.min ? item.min : -Infinity}
            max={item.max ? item.max : Infinity}
            onChange={value => {
              item.onChange && item.onChange(value, this.props.form);
            }}
            style={item.itemInputStyle}
          />
        );
        break;
      case "password":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <Input
            placeholder={item.placeholder}
            disabled={item.disabled}
            type="text"
            auto-complete="off"
            onFocus={e => {
              e.target.type = "password";
            }}
            onChange={e => {
              item.onChange && item.onChange(e, this.props.form);
            }}
            style={item.itemInputStyle}
          />
        );
        break;
      case "textarea":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <TextArea
            placeholder={item.placeholder}
            disabled={item.disabled}
            rows={item.rows}
            autosize
            onChange={e => {
              item.onChange && item.onChange(e, this.props.form);
            }}
            style={{ minHeight: "120px", ...item.itemInputStyle }}
          />
        );
        break;
      case "radio":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <RadioGroup
            onChange={e => {
              item.onChange && item.onChange(e, this.props.form);
            }}
            style={{ width: "100%", ...item.itemInputStyle }}
          >
            {item.options.length > 0
              ? item.options.map(op => {
                  return (
                    <Radio
                      value={op.value}
                      disabled={item.disabled}
                      key={op.value}
                    >
                      {op.label}
                    </Radio>
                  );
                })
              : ""}
          </RadioGroup>
        );
        break;
      case "checkbox":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <CheckboxGroup
            options={item.options}
            disabled={item.disabled}
            onChange={checkedValue => {
              item.onChange && item.onChange(checkedValue, this.props.form);
            }}
            style={item.itemInputStyle}
          />
        );
        break;
      case "select":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <Select
            placeholder={item.placeholder}
            disabled={item.disabled}
            notFoundContent="无"
            onChange={(value, option) => {
              item.onChange && item.onChange(value, option, this.props.form);
            }}
            style={item.itemInputStyle}
          >
            {item.options.map(op => {
              return (
                <Option value={op.value} key={op.value}>
                  {op.label}
                </Option>
              );
            })}
          </Select>
        );
        break;
      case "date": //注：提交方法传出的date值是moment格式
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          item.dateType == "week" ? (
            <WeekPicker
              locale={locale}
              placeholder={item.placeholder}
              disabled={item.disabled}
              disabledDate={item.disabledDate}
              onChange={(date, dateString) => {
                item.onChange &&
                  item.onChange(date, dateString, this.props.form);
              }}
              style={{ width: "100%", ...item.itemInputStyle }}
            />
          ) : item.dateType == "month" ? (
            <MonthPicker
              locale={locale}
              placeholder={item.placeholder}
              disabled={item.disabled}
              disabledDate={item.disabledDate}
              onChange={(date, dateString) => {
                item.onChange &&
                  item.onChange(date, dateString, this.props.form);
              }}
              style={{ width: "100%", ...item.itemInputStyle }}
            />
          ) : (
            <DatePicker
              locale={locale}
              placeholder={item.placeholder}
              disabled={item.disabled}
              disabledDate={item.disabledDate}
              onChange={(date, dateString) => {
                item.onChange &&
                  item.onChange(date, dateString, this.props.form);
              }}
              style={{ width: "100%", ...item.itemInputStyle }}
              min={item.min}
              max={item.max}
            />
          )
        );
        break;
      case "datetime": //注：提交方法传出的date值是moment格式
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <DatePicker
            showTime
            placeholder={item.placeholder}
            disabled={item.disabled}
            disabledDate={item.disabledDate}
            onChange={(date, dateString) => {
              //时间发生变化的回调
              item.onChange && item.onChange(date, dateString, this.props.form);
            }}
            style={item.itemInputStyle}
            format="YYYY-MM-DD HH:mm:ss"
          />
        );
        break;
      case "rangePicker": //注：提交方法传出的date值是moment格式
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <RangePicker
            placeholder={item.placeholder}
            disabled={item.disabled}
            disabledDate={item.disabledDate}
            onChange={(date, dateString) => {
              //时间发生变化的回调
              item.onChange && item.onChange(date, dateString, this.props.form);
            }}
            style={item.itemInputStyle}
          />
        );
        break;
      case "file":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <Upload
            disabled={item.disabled}
            action={item.action}
            listType="text"
            withCredentials={true}
            defaultFileList={[]}
            beforeUpload={() => {
              return false;
            }}
            onChange={info => {
              return item.handleUploadChange(info);
            }}
            style={item.itemInputStyle}
          >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        );
        break;

      /*定制：通知类型*/
      case "inform":
        let departmentPop = (
          <CheckboxGroup
            options={item.departmentOptions}
            onChange={checkedValue => {
              //为通知类型的 部门列表赋值
              this.inform[item.departmentKeyName] = checkedValue;
            }}
          />
        );

        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <RadioGroup
            onChange={e => {
              item.onChange && item.onChange(e, this.props.form);
            }}
          >
            {item.options.length > 0
              ? item.options.map((op, i) => {
                  if (i == 0) {
                    return <Radio value={op.value}>{op.label}</Radio>;
                  } else if (i == 1) {
                    return (
                      <Popconfirm placement="topLeft" title={departmentPop}>
                        <Radio value={op.value}>{op.label}</Radio>
                      </Popconfirm>
                    );
                  } else if (i == 2) {
                    return (
                      <Popconfirm
                        placement="top"
                        title={
                          <ChoosePerson
                            item={item}
                            ref={ins => {
                              this.personInstance = ins;
                            }}
                          />
                        }
                      >
                        <Radio value={op.value}>{op.label}</Radio>
                      </Popconfirm>
                    );
                  }
                })
              : ""}
          </RadioGroup>
        );
        break;
      //text和select的组合
      case "inpSel":
        return getFieldDecorator(item.keyName, {
          rules: item.rules,
          initialValue: item.defaultValue
        })(
          <Input
            placeholder={item.placeholder}
            disabled={item.disabled}
            onChange={e => {
              item.onChange && item.onChange(e, this.props.form);
            }}
            style={item.itemInputStyle}
            addonAfter={getFieldDecorator(item.selName, {
              initialValue: item.defaultSelValue
            })(
              <Select
                placeholder={item.placeholder}
                disabled={item.disabled}
                notFoundContent="无"
                onChange={(value, option) => {
                  item.onChange &&
                    item.onChange(value, option, this.props.form);
                }}
                style={item.itemInputStyle}
              >
                {item.options.map(op => {
                  return (
                    <Option value={op.value} key={op.value}>
                      {op.label}
                    </Option>
                  );
                })}
              </Select>
            )}
          />
        );
        break;
      case "custom":
        return getFieldDecorator(item.keyName, {rules: item.rules})(item.custom());
        break;
      default:
        break;
    }
  }

  render() {
    const {
      formLayout = "horizontal", //horizontal、vertical、inline
      formItemLayout = {
        labelCol: { span: 5 }, //label 标签布局
        wrapperCol: { span: 16 }
      },
      buttonItemLayout = {
        wrapperCol: { span: 15, offset: 9 }
      },
      itemList = [],
      hasFeedback = true, //给输入框添加反馈图标
      onOk, //提交表单执行回调(function||false)
      okText = "确定", //提交表单按钮文本
      buttonStyle = {} //底部按钮样式
    } = this.props;

    return (
      <Form
        onSubmit={e => {
          this.handleSubmit(e);
        }}
        layout={formLayout}
      >
        <div className="myForm-content">
          {itemList.map((item, i) => {
            let itemLayout = item.formItemLayout
              ? item.formItemLayout
              : formItemLayout;
            //渲染每个表单子项
            return (
              <FormItem
                key={i}
                {...itemLayout}
                label={item.name} //label 标签的文本
                hasFeedback={item.hasFeedback === false?false:hasFeedback} //展示校验状态图标
                style={{
                  display:
                    item.visible === false
                      ? "none"
                      : formLayout === "inline"
                        ? "inline-block"
                        : "block",
                  ...item.itemStyle
                }}
                className={item.type === "rowNum" ? "rowNum" : ""}
              >
                {this.getField(item)}
              </FormItem>
            );
          })}
        </div>

        <FormItem
          {...buttonItemLayout}
          style={{ display: "block", marginBottom: 0, ...buttonStyle }}
        >
          {/*自定义添加其他按钮*/}
          {this.props.children}
          {onOk ? (
            <Button type="primary" htmlType="submit">
              {okText}
            </Button>
          ) : (
            ""
          )}
        </FormItem>
      </Form>
    );
  }
}
MyForm.defaultProps = {};

const WrappedMyForm = Form.create()(MyForm);
export default WrappedMyForm;
