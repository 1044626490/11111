import React from "react";
import { Input, Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;

class QuestionWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: []
    };
  }
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {}
  getFormItem = () => {
    const { item, getFieldDecorator } = this.props;
    switch (item.type) {
      case 1: //选择题
        return (
          <li>
            <p>{item.content}</p>
            <div>
              {getFieldDecorator(`${item.id + "-"}`)(
                <CheckboxGroup>
                  {item.optionContent.split("@").map((option, index) => {
                    return (
                      <Checkbox key={index} value={option.substr(0, 1)}>
                        {option}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              )}
            </div>
          </li>
        );
      case 2: //填空题
        let inputEleArr = [];
        for (let i = 0; i < item.optionContent; i++) {
          inputEleArr.push(
            getFieldDecorator(`${item.id + "-" + i}`)(
              <Input key={i} name={`${item.id}+""+${i}`} />
            )
          );
        }
        return (
          <li>
            <p>{item.content}</p>
            <p>{inputEleArr}</p>
          </li>
        );
      case 3: //简答题
      case 4: //编程题
      default:
        break;
    }
  };
  render() {
    return this.getFormItem();
  }
}
export default QuestionWrap;
