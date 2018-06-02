package studycave.application.test.verify;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import studycave.application.test.Answer;
import studycave.application.test.AnswerChoices;
import studycave.application.test.Question;
import studycave.application.test.QuestionChoices;
import studycave.application.test.Test;
import studycave.application.test.TestRepository;

@Component
public class QuestionVerifier {

	@Autowired
	TestRepository testRepository;

	public ResultResponse verify(Long idTest, QuestionVerifyDTO question) {
		Optional<Test> test = testRepository.findById(idTest);
		String type = question.getType();
		if (test.isPresent()) {
			List<Result> results = new ArrayList<Result>();
			Optional<Question> questionCorrect = test.get().getQuestions().stream()
					.filter(q -> q.getId().equals(question.getId())).findAny();
			float points = questionCorrect.get().getPoints();

			if (type.equals("single-choice") || type.equals("multiple-choice") || type.equals("true-false")) {

				for (AnswerVerifyDTO answer : question.getAnswers()) {
					Optional<AnswerChoices> answerCorrect = ((QuestionChoices) questionCorrect.get()).getAnswers()
							.stream().filter(a -> a.getId().equals(answer.getId())).findAny();
					if (answerCorrect.get().getGood() == ((AnswerChoicesVerifyDTO) answer).getIsGood()) {
						results.add(new Result(answer.getId(), true));
					} else {
						results.add(new Result(answer.getId(), false));
						points=0;
					}
				}
			}
			return new ResultResponse(points, results);
		} else {
			return null;
		}

	}
}
