package studycave.application.files;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface MaterialRepository extends CrudRepository<Material, Long> {
	Material save(Material material);
	List<Material> findAll();
}
