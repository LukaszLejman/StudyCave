package studycave.application;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface SetRepository extends CrudRepository<Set, Long> {
	Set save(Set set);
	void deleteById(Long id);
	Optional<Set> findById(Long id);
	List<Set> findAll();
}
