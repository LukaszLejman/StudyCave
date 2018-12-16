package studycave.application.files;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MaterialRepository extends CrudRepository<Material, Long> {
	Material save(Material material);
	List<Material> findAll();
	
	
    @Query("select m from Material m where (:permission is null or m.permission = :permission) and "
            + "(:owner is null or m.owner = :owner)")
	List<Material> findByOptionalPermissionAndOptionalOwner(@Param("permission") String permission, 
	        @Param("owner") Integer owner);
    

	@Query("select t from Material t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'VERIFIED' )")
	List<Material> findMaterialByGroup(@Param("g") Long g);

	@Query("select t from Material t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'UNVERIFIED' )")
	List<Material> findWaitingMaterialByGroupKey(@Param("g") Long g);

}
