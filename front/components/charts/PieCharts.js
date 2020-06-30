import { AnimatedCircularProgress } from "react-native-circular-progress";
import { PanResponder, Text, View, StyleSheet } from "react-native";
import * as React from "react";

const MAX_POINTS = 500;
export default class CircularProgressBar extends React.Component {
  state = {
    isMoving: false,
    pointsDelta: 0,
    points: 325,
  };
  _circularProgressRef;
  _panResponder;
  constructor() {
    super();
    _circularProgressRef = React.createRef();
    _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ isMoving: true, pointsDelta: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {
        if (_circularProgressRef.current) {
          _circularProgressRef.current.animate(0, 0);
        }
        // For each 2 pixels add or subtract 1 point
        this.setState({
          pointsDelta: Math.round(-gestureState.dy / 2),
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (_circularProgressRef.current) {
          _circularProgressRef.current.animate(100, 3000);
        }
        let points = this.state.points + this.state.pointsDelta;
        console.log(Math.min(points, MAX_POINTS));
        this.setState({
          isMoving: false,
          points: points > 0 ? Math.min(points, MAX_POINTS) : 0,
          pointsDelta: 0,
        });
      },
    });
  }
  render() {
    const fill = (this.state.points / MAX_POINTS) * 100;
    return (
      <View {..._panResponder.panHandlers}>
        <AnimatedCircularProgress
          size={150}
          width={4}
          backgroundWidth={20}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {(fill) => (
            <Text style={styles.textInside}>
              {Math.round((MAX_POINTS * fill) / 100)}%{" "}
              <Text style={styles.winrate}>Winrate</Text>
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInside: {
    textAlign: "center",
    color: "#7591af",
    fontSize: 30,
    fontWeight: "100",
  },
  winrate: {
    textAlign: "center",
    color: "#7591af",
    fontSize: 20,
    fontWeight: "100",
  },
});
