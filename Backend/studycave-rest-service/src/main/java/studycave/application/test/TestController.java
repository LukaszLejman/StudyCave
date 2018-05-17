package studycave.application.test;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;





@RestController
@RequestMapping("/tests")
@Api
public class TestController {
	
	@Autowired
	TestRepository testRepository;
	
	
	@GetMapping("/{id}")
	public Optional<Test> getTest(@PathVariable(required = true) Long id) {
		return  testRepository.findById(id);
	}
	
	@PostMapping
	public void postSet(@RequestBody Test test) {
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			for (Answer answer : question.getAnswers())
				answer.setQuestion(question);
		}
		test.setAddDate();
		test.setEditDate();
		testRepository.save(test);
	}
}
