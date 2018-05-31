package studycave.application.test;

import java.util.Optional;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
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
	SimpleTestRepository simpleTestRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ModelMapper modelMapper;
	
	@GetMapping("/{id}")
	public Optional<Test> getTest(@PathVariable(required = true) Long id) {
		return  testRepository.findById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteTest(@PathVariable(required = true)Long id) {
		testRepository.deleteById(id);
	}
	
	@PostMapping
	public void postTestChoices(@RequestBody TestCreateDTO testDTO) {
		System.out.println("tu juz jestem " + testDTO.getOwner());
		User user = userRepository.findByUsername(testDTO.getOwner()).get();
		testDTO.setIdOwner(user.getId());
		System.out.println("znalazlem owner");
		Test test = modelMapper.map(testDTO, Test.class);
		test.setId((long) 0);
		
		System.out.println("zmapowalem model");
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			if(question instanceof QuestionChoices) {
			for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
				answer.setQuestion(question);
				((QuestionChoices) question).setType();
			}
			if(question instanceof QuestionPairs) {
			for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
				answer.setQuestion(question);
				((QuestionPairs) question).setType();
			}
			if(question instanceof QuestionPuzzle) {
			for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
				answer.setQuestion(question);
				((QuestionPuzzle) question).setType();
			}
			if(question instanceof QuestionGaps) {
			for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
				answer.setQuestion(question);
				((QuestionGaps) question).setType();
			}
		}
		test.setAddDate();
		test.setEditDate();
		test.setGrade();
		testRepository.save(test);
	}
	
	@GetMapping
	public List<SimpleTest> getTest() {
		return simpleTestRepository.findAll();
	}

}
