package studycave.application;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;



public interface FlashcardRepository extends CrudRepository<Flashcard, Long> {
	List<Flashcard> findAll();
	void deleteById(Long id);
	void delete(Flashcard flashcard);
	Optional<Flashcard> findById(Long id);
}
