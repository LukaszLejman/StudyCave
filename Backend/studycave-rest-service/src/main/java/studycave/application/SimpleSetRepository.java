package studycave.application;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.yaml.snakeyaml.events.Event.ID;

public interface SimpleSetRepository extends CrudRepository<SimpleSet, Long> {
	SimpleSet save(SimpleSet set);
	List<SimpleSet> findAll();
}
