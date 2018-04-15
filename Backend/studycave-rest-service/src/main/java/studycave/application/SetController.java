package studycave.application;

import java.util.List;
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
@RequestMapping("/sets")
@Api
public class SetController {

	@Autowired
	FlashcardRepository flashcardRepository;
	@Autowired
	SetRepository setRepository;

	@GetMapping("/{id}/")
	public Optional<Set> getSet(@PathVariable(required = true) Long id) {
		return setRepository.findById(id);
	}

	@GetMapping("/")
	public List<Set> getSets() {
		return setRepository.findAll();
	}

	@PostMapping("/")
	public void postSet(@RequestBody Set set) {
		setRepository.save(set);
	}
}
