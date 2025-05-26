import { StackCardStyleInterpolator } from "@react-navigation/stack";



export const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress
    }
  }
};


