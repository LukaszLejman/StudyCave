package studycave.application.flashcard;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SimpleSetRepository extends CrudRepository<SimpleSet, Long> {
	SimpleSet save(SimpleSet set);

	List<SimpleSet> findAll();

	Optional<SimpleSet> findById(Long id);

	
	 @Query("select s from SimpleSet s where (:permission is null or s.permission = :permission) and "
	            + "(:owner is null or s.idOwner = :owner)")
	List<SimpleSet> findByOptionalPermissionAndOptionalOwner(@Param("permission") String permission, 
	        @Param("owner") Integer owner);
}
