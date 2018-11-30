import React from "react";
import { Row, Col, Card, Progress } from "antd";
import "./ProgressNav.less";

class ProgressNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowStage: this.props.stageId?this.props.stageId:1,
      nowStageProgress: this.props.stageId?this.props.stageId:1,
      nowStageProgress1: 0,
      nowStageProgress2: 0,
      nowStageProgress3: 0
    };
    this.primaryId = "";
    this.intermediateId = "";
    this.advancedId = "";
    this.clearanceId = "";
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.stageId !== nextProps.stageId) {
      /* this.setState({
        nowStage: nextProps.stageId,
        nowStageProgress: nextProps.stageId
      });  */
      for (let i = this.props.stageId; i <= nextProps.stageId; i++) {
        setTimeout(() => {
          this.setState({ nowStageProgress: i });
        }, 1000 * 2 * (i - this.props.stageId));
        setTimeout(() => {
          this.setState({ nowStage: i });
        }, 1000 * (2 * (i - this.props.stageId) + 2));
      }
    }
    if (this.props.stage.length !== nextProps.stage.length) {
      /* for (let i = this.state.nowStage; i < nextProps.stage.length-2; i++) {
        setTimeout(() => {
          this.setState({ nowStageProgress: i });
        }, 1000 * 2 * (i - this.state.nowStage));
        setTimeout(() => {
          this.setState({ nowStage: i });
        }, 1000 * (2 * (i - this.state.nowStage) + 2));
      } */
    }
  }
  componentDidMount() {}
  getStageId = id => {
    this.props.getStageId && this.props.getStageId(id);
  };
  render() {
    const { nowStage, nowStageProgress } = this.state;
    const { stage } = this.props;
    stage.map((stageItem, index) => {
      if (stageItem.stageName === "初级") {
      }
      return false;
    });
    const classNameArr = [
      ["human-level-inside", "human-level-between", "human-level-outside"],
      ["ground-level-inside", "ground-level-between", "ground-level-outside"],
      ["heaven-level-inside", "heaven-level-between", "heaven-level-outside"],
      [
        "clearance-level-inside",
        "clearance-level-between",
        "clearance-level-outside"
      ]
    ];
    return (
      <div className="level-card">
        <Row type="flex" justify="center" align="middle">
          {stage.map((stageItem, index) => {
            let classNameDiv =
              index + 1 > nowStage
                ? "progressImg disabled"
                : index + 1 < nowStage
                  ? "progressImg normal"
                  : "progressImg";
            if (index < stage.length - 1) {
              let progressLength =
                index + 1 > nowStageProgress
                  ? 0
                  : index + 1 < nowStageProgress
                    ? 100
                    : 0;
              return (
                <Col key={index}>
                  <Row type="flex" justify="center" align="middle">
                    <Col>
                      <div
                        ref={"progressImg" + index}
                        onClick={() => {
                          classNameDiv !== "progressImg disabled" &&
                            this.getStageId(stageItem.id);
                        }}
                        className={classNameDiv}
                      >
                        <div className={classNameArr[index][0]} />
                        <div className={classNameArr[index][1]} />
                        <div className={classNameArr[index][2]} />
                      </div>
                    </Col>
                    <Col className="progressDiv">
                      <Progress
                        percent={progressLength}
                        strokeLinecap="square"
                        showInfo={false}
                      />
                    </Col>
                  </Row>
                </Col>
              );
            } else {
              return (
                <Col key={index}>
                  <div className={classNameDiv}>
                    <div className={classNameArr[index][0]} />
                    <div className={classNameArr[index][1]} />
                    <div className={classNameArr[index][2]} />
                  </div>
                </Col>
              );
            }
          })}

          {/* <Col>
            <div className="progressImg">
              <div className="ground-level-inside" />
              <div className="ground-level-between" />
              <div className="ground-level-outside" />
            </div>
          </Col>
          <Col span="4">
            <Progress percent={100} strokeLinecap="square" showInfo={false} />
          </Col>
          <Col>
            <div className="progressImg disabled">
              <div className="heaven-level-inside" />
              <div className="heaven-level-between" />
              <div className="heaven-level-outside" />
            </div>
          </Col>
          <Col span="4" className="disabled">
            <Progress percent={50} strokeLinecap="square" showInfo={false} />
          </Col>
          <Col>
            <div className="progressImg disabled">
              <div className="clearance-level-inside" />
              <div className="clearance-level-between" />
              <div className="clearance-level-outside" />
            </div>
          </Col> */}
        </Row>
      </div>
    );
  }
}

export default ProgressNav;
