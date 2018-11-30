import React from "react";
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
  Upload,
  Card,
  Row,
  Alert
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import QuestionWrap from "./QuestionSingle";
import CountDown from "../CountDown/CountDown";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      minutes: 60
    };
  }
  componentDidMount() {
    this.props.onRef(this.refs.submit);
    this.setState({
      minutes: this.props.mint
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.questionsList) {
      const { questionsList = [] } = nextProps;
      this.setState({
        questionsList
      });
    }
    if (nextProps.mint) {
      this.setState({
        minutes: nextProps.mint
      });
    }
  }
  getFormItem = () => {
    const { questionsList } = this.state;
    const { getFieldDecorator } = this.props.form;
    let questionMultipleArr = [];
    let questionFillBlankArr = [];
    let questionShortAnswerArr = [];
    let questionProgrammingArr = [];
    questionsList.map((questionItem, index) => {
      switch (questionItem.type) {
        case 1: //选择题
          questionMultipleArr.push(questionItem);
          break;
        case 2: //填空题
          questionFillBlankArr.push(questionItem);
          break;
        case 3: //简答题
          questionShortAnswerArr.push(questionItem);
          break;
        case 4: //编程题
          questionProgrammingArr.push(questionItem);
          break;
        default:
          break;
      }
      return false;
    });
    let questionMultipStr = questionMultipleArr.map((questionMultip, index) => {
      return (
        <QuestionWrap
          key={index}
          item={questionMultip}
          getFieldDecorator={getFieldDecorator}
        />
      );
    });
    let questionFillBlankStr = questionFillBlankArr.map(
      (questionFillBlank, index) => {
        return (
          <QuestionWrap
            key={index}
            item={questionFillBlank}
            getFieldDecorator={getFieldDecorator}
          />
        );
      }
    );
    if (questionMultipStr.length || questionFillBlankStr.length) {
      return (
        <FormItem>
          <Row>
            <p className="questionTitle1">选择题</p>
            <ol>{questionMultipStr}</ol>
          </Row>
          <Row>
            {questionFillBlankStr.length && (
              <p className="questionTitle2">填空题</p>
            )}
            <ol>{questionFillBlankStr}</ol>
          </Row>
        </FormItem>
      );
    } else {
      return (
        <Alert
          message="获取试题失败"
          description="该考核暂时无试题"
          type="warning"
        />
      );
    }
  };
  handleSubmit = e => {
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // 若验证通过
      if (!err) {
        this.props.onOk({ ...values, ...this.inform });
      }
    });
  };
  lastCount(val) {
    this.props.lastMint(val);
  }
  render() {
    return (
      <div>
        <Form
          style={{ width: "100%", marin: 0, padding: 0 }}
          ref="submit"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <Row style={{ textAlign: "right" }}>
            <CountDown
              key={this.state.minutes}
              minutes={this.state.minutes}
              timeOut={() => {
                this.refs.submit && this.refs.submit.props.onSubmit();
              }}
              lastCount={this.lastCount.bind(this)}
            />
          </Row>
          {this.getFormItem()}
        </Form>
        {/* <FormItem>
       <p style={{ textAlign: "center", display: "none" }}>
         <Button type="primary" htmlType="submit">
           提交试卷
         </Button>
       </p>
     </FormItem> */}
      </div>
    );
  }
}

const WrappedMyForm = Form.create()(MyForm);
export default WrappedMyForm;
