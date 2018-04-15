package studycave.application;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.yaml.snakeyaml.events.Event.ID;

public interface SetRepository extends CrudRepository<Set, Long> {
	Set save(Set set);

	Optional<Set> findById(ID id);

	List<Set> findAll();
}
