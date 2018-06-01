package studycave.application.test;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
		return  testRepository.findById(id);
	}
	
	@DeleteMapping("/{id}")
	public void deleteTest(@PathVariable(required = true)Long id) {
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
			if(question instanceof QuestionChoices) {
			for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionChoices) question).setType();
			}
			if(question instanceof QuestionPairs) {
			for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionPairs) question).setType();
			}
			if(question instanceof QuestionPuzzle) {
			for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionPuzzle) question).setType();
			}
			if(question instanceof QuestionGaps) {
			for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionGaps) question).setType();
			}
		}
		test.setAddDate();
		test.setEditDate();
		test.setGrade();
		testRepository.save(test);
	}
	
	@GetMapping
	public List<SimpleTestDTO> getTest() {
		List<SimpleTest> tests = simpleTestRepository.findAll();
		ArrayList<SimpleTestDTO> testDTOs = new ArrayList<SimpleTestDTO>();
		for(SimpleTest test : tests) {
			User user = userRepository.findById((long) test.getIdOwner()).get();
		    SimpleTestDTO testDTO = modelMapper.map(test, SimpleTestDTO.class);
		    testDTO.setOwner(user.getUsername());
		    testDTOs.add(testDTO);
		}
		return testDTOs;
	}
	
	@PutMapping
	public void editTest(@RequestBody TestCreateDTO testDTO) {
		User user = userRepository.findByUsername(testDTO.getOwner()).get();
		testDTO.setIdOwner(user.getId());
		
		Test test = modelMapper.map(testDTO, Test.class);
		for (Question question : test.getQuestions()) {
			question.setTest(test);
			if(question instanceof QuestionChoices) {
			for (AnswerChoices answer : ((QuestionChoices) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionChoices) question).setType();
			}
			if(question instanceof QuestionPairs) {
			for (AnswerPairs answer : ((QuestionPairs) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionPairs) question).setType();
			}
			if(question instanceof QuestionPuzzle) {
			for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionPuzzle) question).setType();
			}
			if(question instanceof QuestionGaps) {
			for (AnswerGaps answer : ((QuestionGaps) question).getAnswers())
				answer.setQuestion(question);
				//((QuestionGaps) question).setType();
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
			isinq=false;
			for(Question question : test.getQuestions()) {
				if(oldquestion.getId() == question.getId())
					isinq=true;	
			
			if(oldquestion instanceof QuestionChoices && question instanceof QuestionChoices) {
				for (AnswerChoices oldanswer : ((QuestionChoices) oldquestion).getAnswers()) {
					isina=false;
					for(AnswerChoices answer : ((QuestionChoices)question).getAnswers())
						if(oldanswer.getId() == answer.getId())
							isina = true;
					if(isina == true)
						deletea.add(oldanswer.getId());
				}
			}
			if(oldquestion instanceof QuestionPairs && question instanceof QuestionPairs) {
				for (AnswerPairs oldanswer : ((QuestionPairs) oldquestion).getAnswers()) {
					isina=false;
					for(AnswerPairs answer : ((QuestionPairs)question).getAnswers())
						if(oldanswer.getId() == answer.getId())
							isina = true;
					if(isina == true)
						deletea.add(oldanswer.getId());
				}		
			}
			if(oldquestion instanceof QuestionPuzzle && question instanceof QuestionPuzzle) {
				for (AnswerPuzzle oldanswer : ((QuestionPuzzle) oldquestion).getAnswers()) {
					isina=false;
					for(AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers())
						if(oldanswer.getId() == answer.getId())
							isina=true;
					if(isina == true)
						deletea.add(oldanswer.getId());
				}
			}
			if(oldquestion instanceof QuestionGaps && question instanceof QuestionGaps) {
				for (AnswerGaps oldanswer : ((QuestionGaps) oldquestion).getAnswers()) {
				isina=false;
				for(AnswerGaps answer : ((QuestionGaps)question).getAnswers())
					if(oldanswer.getId() == answer.getId())
						isina=true;
				if(isina == true)
					deletea.add(oldanswer.getId());
				}
			}	
		}	
			if(isinq == true)
				deleteq.add(oldquestion.getId());
		}
		testRepository.save(test);
		for(Long q: deleteq)
			if(q != null)
				if(questionRepository.findById(q) != null)
					questionRepository.deleteById(q);
	
		for(Long a : deletea)
			if(a != null)
				if(answerRepository.findById(a) != null)
					answerRepository.deleteById(a);
	}
}
