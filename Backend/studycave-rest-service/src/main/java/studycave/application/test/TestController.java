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
	public void postTest(@RequestBody TestCreateDTO testDTO) {
		System.out.print("dziala");
		User user = userRepository.findByUsername(testDTO.getOwner()).get();
		testDTO.setIdOwner(user.getId());
		System.out.print("DTO");
		Test test = modelMapper.map(testDTO, Test.class);
		test.setId((long) 0);
		System.out.print("test");
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			for (Answer answer : question.getAnswers())
				answer.setQuestion(question);
		}
		System.out.print("pentle");
		test.setAddDate();
		test.setEditDate();
		
		testRepository.save(test);
	}
	
	@GetMapping
	public List<SimpleTest> getTest() {
		return simpleTestRepository.findAll();
	}

}
