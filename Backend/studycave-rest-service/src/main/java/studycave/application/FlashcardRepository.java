package studycave.application;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.yaml.snakeyaml.events.Event.ID;



public interface FlashcardRepository extends CrudRepository<Flashcard, Long> {
	List<Flashcard> findAll();
	void deleteById(ID id);
	void delete(Flashcard flashcard);
	Optional<Flashcard> findById(ID id);
}
