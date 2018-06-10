package studycave.application.test;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SimpleTestRepository extends CrudRepository<SimpleTest, Long> {
	List<SimpleTest> findAll(); 
	
    @Query("select t from SimpleTest t where (:permission is null or t.permission = :permission) and "
            + "(:owner is null or t.idOwner = :owner)")
	List<SimpleTest> findByOptionalPermissionAndOptionalOwner(@Param("permission") String permission, 
	        @Param("owner") Long owner);
}
