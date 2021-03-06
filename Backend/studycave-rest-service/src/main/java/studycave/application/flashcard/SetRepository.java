package studycave.application.flashcard;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SetRepository extends CrudRepository<Set, Long> {
	Set save(Set set);
	void deleteById(Long id);
	Optional<Set> findById(Long id);
	List<Set> findAll();
	
	@Query("select count(s) from Set s join s.flashcards f where (f.leftSide = :x and f.rightSide = :y and s.id=:id) or (f.leftSide = :y and f.rightSide = :x and s.id=:id)")
	int findResult(@Param("id") Long id, @Param("x") String x,@Param("y") String y);

		
	@Query("select t from Set t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'VERIFIED' )")
	List<Set> findSetByGroup(@Param("g") Long g);

	
	@Query("select t from Set t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'UNVERIFIED' )")
	List<Set> findWaitingSetByGroupKey(@Param("g") Long g);

}
