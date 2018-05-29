package studycave.application.files;

import org.springframework.data.repository.CrudRepository;

public interface MaterialRepository extends CrudRepository<Material, Long> {
	Material save(Material material);
}
