package studycave.application;

import java.util.List;
import org.springframework.data.repository.CrudRepository;



public interface FlashcardRepository extends CrudRepository<Flashcard, Long> {
	List<Flashcard> findAll();
}
