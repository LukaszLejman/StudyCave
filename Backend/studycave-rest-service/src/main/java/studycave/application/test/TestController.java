package studycave.application.test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import studycave.application.badges.Badge;
import studycave.application.badges.BadgeRepository;
import studycave.application.groups.GroupRepository;
import studycave.application.test.result.GetResultDTO;
import studycave.application.test.result.SaveTestResultDTO;
import studycave.application.test.result.TestResult;
import studycave.application.test.result.TestResultRepository;
import studycave.application.test.solvedto.AnswerChoicesSolveDTO;
import studycave.application.test.solvedto.AnswerGapsSolveDTO;
import studycave.application.test.solvedto.AnswerPairsSolveDTO;
import studycave.application.test.solvedto.AnswerPuzzleSolveDTO;
import studycave.application.test.verify.QuestionVerifier;
import studycave.application.test.verify.QuestionVerifyDTO;
import studycave.application.test.verify.ResultResponse;
import studycave.application.user.User;
import studycave.application.user.UserBadge;
import studycave.application.user.UserBadgeRepository;
import studycave.application.user.UserRepository;
import studycave.application.userActivity.UserActivityService;

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
	BadgeRepository badgeRepository;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserBadgeRepository userBadgeRepository;
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	QuestionVerifier questionVerifier;
	@Autowired
	TestResultRepository testResultRepository;
  	@Autowired
  	UserActivityService userActivityService;

	@GetMapping("/{id}")
	public Optional<Test> getTest(@PathVariable(required = true) Long id) {
		Optional<Test> test = testRepository.findById(id);
		for (Question question : test.get().getQuestions()) {
			if(question instanceof QuestionGaps) {
				List<AnswerGaps> answers = ((QuestionGaps)question).getAnswers();
				Collections.sort(answers, 
                        (o1, o2) -> o1.getId().compareTo(o2.getId()));
			}
		}
		test.get().setGroup(null);
		test.get().setActivity(null);
		return test;
	}

	@GetMapping("/{id}/solve")
	public TestOwnerDTO getTestToSolve(@PathVariable(required = true) Long id) {

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
		User user = userRepository.findById(test.get().getIdOwner()).get();
		TestOwnerDTO testDTO = modelMapper.map(test.get(), TestOwnerDTO.class);
		testDTO.setOwner(user.getUsername());
		return testDTO;
	}

	@PostMapping("/results")
	public void saveResult(@RequestBody SaveTestResultDTO resultDTO) {
		User user = userRepository.findByUsername(resultDTO.getOwner()).get();
		Optional<Test> test = testRepository.findById(resultDTO.getIdTest());
		
		List<TestResult> testResult = this.testResultRepository.findByIdOwnerAndIdTest(user.getId(), resultDTO.getIdTest());
		
		if (testResult.size() > 0) {
			return;
		}
		
		
		int maxScore = 0;
		for (Question question : test.get().getQuestions()) {
			maxScore += question.getPoints();

		}
		TestResult result = modelMapper.map(resultDTO, TestResult.class);
		result.setIdOwner(user.getId());
		result.setMaxScore(maxScore);
		result.setIdResult((long) 0);
		testResultRepository.save(result);
		userActivityService.saveActivity("solvedTest", resultDTO.getUserScore().intValue(), null, user, null, test.get().getGroup(), null, null, test.get());
	}

	@GetMapping("/results/max")
	public GetResultDTO saveResult(@RequestParam Long id, @RequestParam String username) {

		User user = userRepository.findByUsername(username).get();
		List<TestResult> result = testResultRepository.findByIdOwnerAndIdTest(user.getId(), id);

		if (!result.isEmpty()) {
			TestResult maxResult = result.get(0);
			for (TestResult t : result) {
				if (t.getUserScore() > maxResult.getUserScore()) {
					maxResult = t;
				}
			}
			return new GetResultDTO(maxResult.getUserScore(), maxResult.getMaxScore());
		} else {
			Optional<Test> test = testRepository.findById(id);
			int maxScore = 0;
			for (Question question : test.get().getQuestions()) {
				maxScore += question.getPoints();
			}
			return new GetResultDTO(0, maxScore);
		}

	}

	@PostMapping("/{id}/questions/verify")
	public ResultResponse verifyQuestion(@PathVariable(required = true) Long id,
			@RequestBody QuestionVerifyDTO question) {
		return questionVerifier.verify(id, question);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteTest(@PathVariable(required = true) Long id) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long userId = userRepository.findByUsername(currentPrincipalName).get().getId();

		Optional<Test> test = testRepository.findById(id);
		if (test.isPresent()) {
			if (userId.equals(test.get().getIdOwner())) {
				testRepository.deleteById(id);
				return new ResponseEntity(HttpStatus.OK);
			}
		}
		return new ResponseEntity("Access Forbidden", HttpStatus.FORBIDDEN);
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
		
	// Badge for creating first test
		if(userBadgeRepository.findByIdAndUser((long)4, user.getId()).isEmpty()) {
		UserBadge badgeAchieved = new UserBadge();
		Badge badge = new Badge();
		badge = badgeRepository.findById((long)4).orElse(null);
		badgeAchieved.setBadge(badge);
		badgeAchieved.setUser(user);
		userBadgeRepository.save(badgeAchieved);
		}
		
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
			if(test.getGroupId() != null)
			testDTO.setGroup(groupRepository.findById((long)test.getGroupId()).orElse(null).getName());
			testDTOs.add(testDTO);
			
		}
		return new ResponseEntity<List<SimpleTestDTO>>(testDTOs, HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity editTest(@RequestBody TestEditDTO testDTO) {

		
		//Authorization
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long userId = userRepository.findByUsername(currentPrincipalName).get().getId();

		
		Optional<Test> originalTest = testRepository.findById(testDTO.getId());
		
		if (userId.equals(originalTest.get().getIdOwner())) {
			// pass

		} else
			return new ResponseEntity("Access Forbidden", HttpStatus.FORBIDDEN);

		//
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
				List<AnswerGaps> answers = new ArrayList<>();
				if (oldquestion instanceof QuestionGaps && question instanceof QuestionGaps) {
					for (AnswerGaps answer : ((QuestionGaps) question).getAnswers()) {
						answers.add(answer);
					}
					Collections.reverse(answers);
					for (AnswerGaps answer : answers) {
						answer.setId(null);
						answer.setQuestion(question);
					}
						
					for (AnswerGaps oldanswer : ((QuestionGaps) oldquestion).getAnswers()) {
						if (answerRepository.findById(oldanswer.getId()) != null) {
							deletea.add(oldanswer.getId());
							// deleteq.add(oldquestion.getId());
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

		return new ResponseEntity(HttpStatus.OK);

	}
}
