package studycave.application.builders;

import java.util.ArrayList;
import java.util.List;
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
			test.setIdOwner((long) 1);
			test.setPermission("public");
			List<Question> questions = new ArrayList<Question>();
			Question question;
			for (int j = 0; j < questionsNumber; j++) {

				Random rand = new Random();
				switch(rand.nextInt(4)+1){
					case 1: 
						question = new QuestionChoices();
					case 2:
						question = new QuestionGaps();
					case 3:
						question = new QuestionPairs();
					case 4:
						question = new QuestionPuzzle();
				}
//				question.setNrQuestion(j);
//				question.setText("question ???");
//			questions.add(question);		
				
			}
			test.setQuestions(questions);
			testRepository.save(test);
		}
		System.out.print("Tests inserted");
	}
}
