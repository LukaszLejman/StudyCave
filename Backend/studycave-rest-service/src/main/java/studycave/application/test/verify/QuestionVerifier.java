package studycave.application.test.verify;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import studycave.application.test.AnswerChoices;
import studycave.application.test.AnswerGaps;
import studycave.application.test.AnswerPairs;
import studycave.application.test.AnswerPuzzle;
import studycave.application.test.Question;
import studycave.application.test.QuestionChoices;
import studycave.application.test.QuestionGaps;
import studycave.application.test.QuestionPairs;
import studycave.application.test.QuestionPuzzle;
import studycave.application.test.Test;
import studycave.application.test.TestRepository;

@Component
public class QuestionVerifier {

	@Autowired
	TestRepository testRepository;

	private ResultResponse choiceVerify(QuestionVerifyDTO question, Question questionCorrect) {
		List<Result> results = new ArrayList<Result>();
		float points = questionCorrect.getPoints();
		for (AnswerVerifyDTO element : question.getAnswers()) {
			AnswerChoicesVerifyDTO answer = (AnswerChoicesVerifyDTO) element;
			Optional<AnswerChoices> answerCorrect = ((QuestionChoices) questionCorrect).getAnswers().stream()
					.filter(a -> a.getId().equals(answer.getId())).findAny();
			if (answerCorrect.get().getGood() == ((AnswerChoicesVerifyDTO) answer).getIsGood()) {
				results.add(new Result(answer.getId(), true));
			} else {
				results.add(new Result(answer.getId(), false));
				points = 0;
			}
		}
		return new ResultResponse(points, results);
	}

	private ResultResponse gapsVerify(QuestionVerifyDTO question, Question questionCorrect) {
		List<Result> results = new ArrayList<Result>();
		float points = questionCorrect.getPoints();
		for (AnswerVerifyDTO element : question.getAnswers()) {
			AnswerGapsVerifyDTO answer = (AnswerGapsVerifyDTO) element;
			Optional<AnswerGaps> answerCorrect = ((QuestionGaps) questionCorrect).getAnswers().stream()
					.filter(a -> a.getId().equals(answer.getId())).findAny();
			if (Arrays.asList(answerCorrect.get().getContent()).stream()
					.anyMatch(((AnswerGapsVerifyDTO) answer).getContent()::equalsIgnoreCase)) {
				results.add(new Result(answer.getId(), true));
			} else {
				results.add(new Result(answer.getId(), false));
				points = 0;
			}
		}
		return new ResultResponse(points, results);
	}

	private ResultResponse pairsVerify(QuestionVerifyDTO question, Question questionCorrect) {
		List<Result> results = new ArrayList<Result>();
		float points = questionCorrect.getPoints();

		for (AnswerVerifyDTO element : question.getAnswers()) {
			AnswerPairsVerifyDTO answer = (AnswerPairsVerifyDTO) element;
			Optional<AnswerPairs> answerCorrect = ((QuestionPairs) questionCorrect).getAnswers().stream()
					.filter(a -> a.getFirst().equals(answer.getLeft()))
					.findAny();
			if (answerCorrect.isPresent()) {
				if (answerCorrect.get().getSecond().equals(answer.getRight())) {
					results.add(new ResultPairs(answer.getLeft(), answer.getRight(), true));
				} else {
					results.add(new ResultPairs(answer.getLeft(), answer.getRight(), false));
					points = 0;
				}
			} else {
				points = 0;
				results.add(new ResultPairs(answer.getLeft(), answer.getRight(), false));
			}
		}
		return new ResultResponse(points, results);
	}

	private ResultResponse puzzleVerify(QuestionVerifyDTO question, Question questionCorrect) {
		List<Result> results = new ArrayList<Result>();

		float points = questionCorrect.getPoints();
		for (AnswerVerifyDTO element : question.getAnswers()) {
			AnswerPuzzleVerifyDTO answer = (AnswerPuzzleVerifyDTO) element;
			Optional<AnswerPuzzle> answerCorrect = ((QuestionPuzzle) questionCorrect).getAnswers().stream()
					.filter(a -> a.getId().equals(answer.getId())).findAny();

			List<String> userPuzzles = answer.getPuzzles();
			String[] correctPuzzles = answerCorrect.get().getCorrect();

			if (userPuzzles.size() == correctPuzzles.length) {
				Result result = new Result(answer.getId(), true);
				for (int i = 0; i < userPuzzles.size(); i++) {
					if (userPuzzles.get(i).equalsIgnoreCase(correctPuzzles[i])) {
						// pass
					} else {
						result.setCorrect(false);
						points = 0;
					}
				}
				results.add(result);
			} else
				points = 0;

		}

		return new ResultResponse(points, results);
	}

	public ResultResponse verify(Long idTest, QuestionVerifyDTO question) {
		Optional<Test> test = testRepository.findById(idTest);
		String type = question.getType();
		if (test.isPresent()) {

			Optional<Question> questionCorrect = test.get().getQuestions().stream()
					.filter(q -> q.getId().equals(question.getId())).findAny();

			if (type.equals("single-choice") || type.equals("multiple-choice") || type.equals("true-false")) {
				{
					return choiceVerify(question, questionCorrect.get());
				}

			}

			if (type.equals("gaps")) {
				{
					return gapsVerify(question, questionCorrect.get());
				}
			}
			if (type.equals("pairs")) {
				{
					return pairsVerify(question, questionCorrect.get());
				}
			}
			if (type.equals("puzzle")) {
				{
					return puzzleVerify(question, questionCorrect.get());
				}
			}

		}
		return null;

	}

}
