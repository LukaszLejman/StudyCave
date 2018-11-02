package studycave.application.builders;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
	private QuestionRepository questionRepository;
	private AnswerRepository answerRepository;
	
	@Autowired TestsBuilder(TestRepository testRepository, QuestionRepository questionRepository, AnswerRepository answerRepository){
		this.testRepository = testRepository;
		this.questionRepository = questionRepository;
		this.answerRepository = answerRepository;
	}
	
	public void build( ) {
		int testsNumber = 10;
		int questionsNumber = 5;
		
		for (int i = 0; i < testsNumber; i++) {
			Test test = new Test();
			for (int j = 0; j < questionsNumber; j++) {
				Random rand = new Random();
//				switch(rand.nextInt(4)+1){
//					case 1: 
//						Question question = new QuestionChoices();
//					case 2:
//						Question question = new QuestionGaps();
//					case 3:
//						Question question = new QuestionPairs();
//					case 4:
//						Question question = new QuestionPuzzle();
//				}
				
					
				
			}
			//test.setQuestions(questions);
		}
		System.out.print("Tests inserted");
	}
}
