package studycave.application.test;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface SimpleTestRepository extends CrudRepository<SimpleTest, Long> {
	List<SimpleTest> findAll(); 
}
