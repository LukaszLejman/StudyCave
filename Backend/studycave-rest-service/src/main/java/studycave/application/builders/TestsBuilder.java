package studycave.application.builders;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import studycave.application.test.Answer;
import studycave.application.test.AnswerChoices;
import studycave.application.test.AnswerGaps;
import studycave.application.test.AnswerPairs;
import studycave.application.test.AnswerPuzzle;
import studycave.application.test.AnswerRepository;
import studycave.application.test.Question;
import studycave.application.test.QuestionChoices;
import studycave.application.test.QuestionGaps;
import studycave.application.test.QuestionPairs;
import studycave.application.test.QuestionPuzzle;
import studycave.application.test.QuestionRepository;
import studycave.application.test.Test;
import studycave.application.test.TestRepository;

@Component
public class TestsBuilder {
	
	@Autowired
	private TestRepository testRepository;

	
	@Autowired TestsBuilder(TestRepository testRepository, QuestionRepository questionRepository, AnswerRepository answerRepository){
		this.testRepository = testRepository;
	}
	
	public void build( ) {
		int testsNumber = 5;
		int questionsNumber = 5;
		int answersNumber = 3;
		
		for (int i = 0; i < testsNumber; i++) {
			Test test = new Test();
			test.setAddDate();
			test.setEditDate();
			test.setIdOwner((long) 2);
			test.setPermission("public");
			List<Question> questions = new ArrayList<Question>();
			for (int j = 0; j < questionsNumber; j++) {

				Random rand = new Random();
				switch(rand.nextInt(4)+1){
					case 1: 
						QuestionChoices question1 = new QuestionChoices();
						question1.setType("single-choice");
						List<AnswerChoices> answersch = new ArrayList<AnswerChoices>();	
						//--Answer1
							AnswerChoices answer1 = new AnswerChoices();
							answer1.setContent("prawda");
							answer1.setGood(true);
							answer1.setQuestion(question1);
							answersch.add(answer1);
						//--Answer2
							AnswerChoices answer2 = new AnswerChoices();
							answer2.setContent("fałsz");
							answer2.setGood(false);
							answer2.setQuestion(question1);
							answersch.add(answer2);
						question1.setAnswers(answersch);	
						question1.setPoints(1);
						question1.setNrQuestion(j);
						question1.setText("question ???");
						questions.add(question1);
						break;
					case 2:
						QuestionGaps question2 = new QuestionGaps();
						question2.setType("gaps");
							List<AnswerGaps> answersg = new ArrayList<AnswerGaps>();
						//--Answer1
							AnswerGaps answerg1 = new AnswerGaps();
							String[] content = {"not"};
							answerg1.setContent(content);
							answerg1.setGap(false);
							answerg1.setQuestion(question2);
							answersg.add(answerg1);
						//--Answer2
							ArrayUtils.removeElement(content,"not");
							ArrayUtils.add(content, "gap");
							AnswerGaps answerg2 = new AnswerGaps();
							answerg2.setContent(content);
							answerg2.setGap(true);
							answersg.add(answerg2);
							answerg2.setQuestion(question2);
						question2.setAnswers(answersg);
						question2.setPoints(1);
						question2.setNrQuestion(j);
						question2.setText("question ???");
						questions.add(question2);
						break;
					case 3:
						QuestionPairs question3 = new QuestionPairs();
						question3.setType("pairs");
						question3.setNrQuestion(j);
							List<AnswerPairs> answersp = new ArrayList<AnswerPairs>();
						//--Answer1
							AnswerPairs answerp1 = new AnswerPairs();
							answerp1.setFirst("jeden");
							answerp1.setSecond("one");
							answerp1.setQuestion(question3);
							answersp.add(answerp1);
						//--Answer2
							AnswerPairs answerp2 = new AnswerPairs();
							answerp2.setFirst("dwa");
							answerp2.setSecond("two");
							answerp2.setQuestion(question3);
							answersp.add(answerp2);
						question3.setPoints(1);
						question3.setAnswers(answersp);
						question3.setText("question ???");
						questions.add(question3);
						break;
					case 4:
						QuestionPuzzle question4 = new QuestionPuzzle();
						question4.setType("puzzle");
						question4.setNrQuestion(j);
							List<AnswerPuzzle> answerspz = new ArrayList<AnswerPuzzle>();
						//--Answer1
							AnswerPuzzle answerpz1 = new AnswerPuzzle();
							String[] correct = {"a", "b", "c", "d", "e"};
							answerpz1.setCorrect(correct);
							answerpz1.setQuestion(question4);
							answerspz.add(answerpz1);
						question4.setPoints(1);
						question4.setAnswers(answerspz);
						question4.setText("question ???");
						questions.add(question4);
						break;
				}
		
				
			}
			test.setQuestions(questions);
			testRepository.save(test);
		}
		System.out.println("Tests inserted");
	}
}
