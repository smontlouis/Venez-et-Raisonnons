import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import HTMLView from 'react-native-htmlview';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { Header } from '../components';
import * as QuestionsActions from '../redux/modules/questions';


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  responseContainer: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 25,
    paddingBottom: 25,
  },
  header: {
    padding: 35,
    backgroundColor: '$color.primary',
  },
  title: {
    fontFamily: '$font.title',
    color: 'white',
    fontSize: 29,
    lineHeight: 38,
    width: '80%',
    marginTop: 5,
  },
  subTitle: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: '$color.tertiary',
    marginBottom: 15,
  },
  topic: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
  },

  // HTML View
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
});

const getCurrentQuestion = (state, props) => state.questions.get('questions').get(props.params.questionId);

@connect(
  (state, ownProps) => ({
    question: getCurrentQuestion(state, ownProps),
  }),
  QuestionsActions,
)
export default class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  render() {
    const { question } = this.props;
    const htmlContent = '<h1><img alt="Saturn V carrying Apollo 11" class="right" src="http://c.cksource.com/a/1/img/sample.jpg" /> Apollo 11</h1><p><strong>Apollo 11</strong> was the spaceflight that landed the first humans, Americans <a href="http://en.wikipedia.org/wiki/Neil_Armstrong">Neil Armstrong</a> and <a href="http://en.wikipedia.org/wiki/Buzz_Aldrin">Buzz Aldrin</a>, on the Moon on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface 6 hours later on July 21 at 02:56 UTC.</p><p>Armstrong spent about <s>three and a half</s> two and a half hours outside the spacecraft, Aldrin slightly less; and together they collected 47.5 pounds (21.5&nbsp;kg) of lunar material for return to Earth. A third member of the mission, <a href="http://en.wikipedia.org/wiki/Michael_Collins_(astronaut)">Michael Collins</a>, piloted the <a href="http://en.wikipedia.org/wiki/Apollo_Command/Service_Module">command</a> spacecraft alone in lunar orbit until Armstrong and Aldrin returned to it for the trip back to Earth.</p>';
    return (
      <View style={styles.container}>
        <Header title="Question" />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.topic}>La Bible</Text>
            <Text style={styles.title}>{ question.get('title') }</Text>
          </View>
          <View style={styles.responseContainer}>
            <Text style={styles.subTitle}>Réponse</Text>
            <HTMLView
              value={htmlContent}
              stylesheet={styles}
              onLinkPress={url => console.log('clicked link: ', url)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
