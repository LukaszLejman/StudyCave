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
	SimpleTestRepository simpleTestRepository;
	UserRepository userRepository;
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
		User user = userRepository.findByUsername(testDTO.getOwner()).get();
		testDTO.setIdOwner(user.getId());
		
		Test test = modelMapper.map(testDTO, Test.class);
		test.setId((long) 0);
		
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			if(question instanceof QuestionChoices)
				//QuestionChoices questionch = (questionch)question;
				//QuestionChoices questionch = (QuestionChoices)question;
			for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
				answer.setQuestion(question);
			
			if(question instanceof Question)
			for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
				answer.setQuestion(question);
		
			if(question instanceof QuestionPuzzle)
			for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
				answer.setQuestion(question);
			
			if(question instanceof QuestionGaps)
			for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
				answer.setQuestion(question);
			
		}
		test.setAddDate();
		test.setEditDate();
		testRepository.save(test);
	}
	
	@GetMapping
	public List<SimpleTest> getTest() {
		return simpleTestRepository.findAll();
	}

}
