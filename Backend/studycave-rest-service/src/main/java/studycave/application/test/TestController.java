package studycave.application.test;

import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import studycave.application.test.solvedto.AnswerChoicesSolveDTO;
import studycave.application.test.solvedto.AnswerGapsSolveDTO;
import studycave.application.test.solvedto.AnswerPairsSolveDTO;
import studycave.application.test.solvedto.AnswerPuzzleSolveDTO;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/tests")
@Api
public class TestController {

	@Autowired
	TestRepository testRepository;
	@Autowired
	QuestionRepository questionRepository;
	@Autowired
	AnswerRepository answerRepository;
	@Autowired
	SimpleTestRepository simpleTestRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ModelMapper modelMapper;

	@GetMapping("/{id}")
	public Optional<Test> getTest(@PathVariable(required = true) Long id) {
		return testRepository.findById(id);
	}

	@GetMapping("/{id}/solve")
	public Optional<Test> getTestToSolve(@PathVariable(required = true) Long id) {

		Optional<Test> test = testRepository.findById(id);

		for (Question question : test.get().getQuestions()) {
			if (question.getType().equals("true-false") || question.getType().equals("single-choice")
					|| question.getType().equals("multiple-choice")) {
				List<AnswerChoices> answersDTOs = new ArrayList<AnswerChoices>();
				for (Answer answer : ((QuestionChoices) question).getAnswers()) {
					AnswerChoicesSolveDTO answerDTO = modelMapper.map(answer, AnswerChoicesSolveDTO.class);
					answersDTOs.add(answerDTO);
				}
				((QuestionChoices) question).setAnswers(answersDTOs);
			}
			if (question.getType().equals("puzzle")) {
				List<AnswerPuzzle> answersDTOs = new ArrayList<AnswerPuzzle>();
				for (Answer answer : ((QuestionPuzzle) question).getAnswers()) {
					AnswerPuzzleSolveDTO answerDTO = modelMapper.map(answer, AnswerPuzzleSolveDTO.class);
					answerDTO.generatePuzzles();
					answersDTOs.add(answerDTO);
				}
				((QuestionPuzzle) question).setAnswers(answersDTOs);
			}
			if (question.getType().equals("gaps")) {
				{
					List<AnswerGaps> answersDTOs = new ArrayList<AnswerGaps>();
					for (Answer answer : ((QuestionGaps) question).getAnswers()) {
						AnswerGapsSolveDTO answerDTO = modelMapper.map(answer, AnswerGapsSolveDTO.class);
						if (answerDTO.isGap())
							answerDTO.setContent(null);

						answersDTOs.add(answerDTO);
					}
					((QuestionGaps) question).setAnswers(answersDTOs);
				}
			}
			if (question.getType().equals("pairs")) {
				List<AnswerPairs> answersDTOs = new ArrayList<AnswerPairs>();

				List<String> left = new ArrayList<String>();
				List<String> right = new ArrayList<String>();

				for (Answer answer : ((QuestionPairs) question).getAnswers()) {
					left.add(((AnswerPairs) answer).getFirst());
					right.add(((AnswerPairs) answer).getSecond());
				}
				Collections.shuffle(left);
				Collections.shuffle(right);
				answersDTOs.add(new AnswerPairsSolveDTO(left, right));
				((QuestionPairs) question).setAnswers(answersDTOs);
			}
		}
		return test;
	}

	@DeleteMapping("/{id}")
	public void deleteTest(@PathVariable(required = true) Long id) {
		testRepository.deleteById(id);
	}

	@PostMapping
	public void postTest(@RequestBody TestCreateDTO testDTO) {
		User user = userRepository.findByUsername(testDTO.getOwner()).get();
		testDTO.setIdOwner(user.getId());
		Test test = modelMapper.map(testDTO, Test.class);
		test.setId((long) 0);
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			if (question instanceof QuestionChoices) {
				for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionChoices) question).setType();
			}
			if (question instanceof QuestionPairs) {
				for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionPairs) question).setType();
			}
			if (question instanceof QuestionPuzzle) {
				for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionPuzzle) question).setType();
			}
			if (question instanceof QuestionGaps) {
				for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionGaps) question).setType();
			}
		}
		test.setAddDate();
		test.setEditDate();
		test.setGrade();
		testRepository.save(test);
	}

	@GetMapping
	public ResponseEntity<?> getTest(@RequestParam(value = "owner", required = false) String owner,
			@RequestParam(value = "permission", required = false) String permission) {

		Optional<User> user = userRepository.findByUsername(owner);
		Long ownerId = user.isPresent() ? user.get().getId() : null;

		if (owner != null && !user.isPresent())
			return new ResponseEntity<>(new String("User not found"), HttpStatus.NOT_FOUND);

		ArrayList<SimpleTestDTO> testDTOs = new ArrayList<SimpleTestDTO>();

		List<SimpleTest> tests = simpleTestRepository.findByOptionalPermissionAndOptionalOwner(permission, ownerId);
		for (SimpleTest test : tests) {
			String username = userRepository.findById((long) test.getIdOwner()).get().getUsername();
			SimpleTestDTO testDTO = modelMapper.map(test, SimpleTestDTO.class);
			testDTO.setOwner(username);
			testDTOs.add(testDTO);
		}
		return new ResponseEntity<List<SimpleTestDTO>>(testDTOs, HttpStatus.OK);
	}

	@PutMapping
	public void editTest(@RequestBody TestEditDTO testDTO) {
		User user = userRepository.findByUsername(testDTO.getOwner()).get();
		testDTO.setIdOwner(user.getId());

		Test test = modelMapper.map(testDTO, Test.class);
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			if (question instanceof QuestionChoices) {
				for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionChoices) question).setType();
			}
			if (question instanceof QuestionPairs) {
				for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionPairs) question).setType();
			}
			if (question instanceof QuestionPuzzle) {
				for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionPuzzle) question).setType();
			}
			if (question instanceof QuestionGaps) {
				for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
					answer.setQuestion(question);
				// ((QuestionGaps) question).setType();
			}
		}

		List<Long> deleteq = new ArrayList<>();
		List<Long> deletea = new ArrayList<>();
		Test oldtest = testRepository.findById(test.getId()).orElse(null);

		test.setAddDate(oldtest.getAddDate());
		test.setEditDate();
		test.setGrade(oldtest.getGrade());

		Boolean isinq = false;
		Boolean isina = false;

		for (Question oldquestion : oldtest.getQuestions()) {
			isinq = false;
			for (Question question : test.getQuestions()) {
				if (oldquestion.getId() == question.getId())
					isinq = true;

				if (oldquestion instanceof QuestionChoices && question instanceof QuestionChoices) {
					for (AnswerChoices oldanswer : ((QuestionChoices) oldquestion).getAnswers()) {
						isina = false;
						for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
							if (oldanswer.getId() == answer.getId())
								isina = true;
						if (isina == false) {
							deletea.add(oldanswer.getId());
							// System.out.println("usuwam answer: "+oldanswer.getId());
						}
					}
				}
				if (oldquestion instanceof QuestionPairs && question instanceof QuestionPairs) {
					for (AnswerPairs oldanswer : ((QuestionPairs) oldquestion).getAnswers()) {
						isina = false;
						for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
							if (oldanswer.getId() == answer.getId())
								isina = true;
						if (isina == false) {
							deletea.add(oldanswer.getId());
							// System.out.println("usuwam answer: "+oldanswer.getId());
						}
					}
				}
				if (oldquestion instanceof QuestionPuzzle && question instanceof QuestionPuzzle) {
					for (AnswerPuzzle oldanswer : ((QuestionPuzzle) oldquestion).getAnswers()) {
						isina = false;
						for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
							if (oldanswer.getId() == answer.getId())
								isina = true;
						if (isina == false) {
							deletea.add(oldanswer.getId());
							// System.out.println("usuwam answer: "+oldanswer.getId());
						}
					}
				}
				if (oldquestion instanceof QuestionGaps && question instanceof QuestionGaps) {
					for (AnswerGaps oldanswer : ((QuestionGaps) oldquestion).getAnswers()) {
						isina = false;
						for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
							if (oldanswer.getId() == answer.getId())
								isina = true;
						if (isina == false) {
							deletea.add(oldanswer.getId());
							// System.out.println("usuwam answer: "+oldanswer.getId());
						}
					}
				}

				// System.out.println(question.getId()+" "+ oldquestion.getId());
			}
			if (isinq == false) {
				deleteq.add(oldquestion.getId());
				// System.out.println("usuwam "+oldquestion.getId());
			}
		}
		testRepository.save(test);

		for (Long a : deletea)
			if (a != null)
				if (answerRepository.findById(a) != null)
					answerRepository.deleteById(a);
		for (Long q : deleteq)
			if (q != null)
				if (questionRepository.findById(q) != null)
					questionRepository.deleteById(q);

	}
}