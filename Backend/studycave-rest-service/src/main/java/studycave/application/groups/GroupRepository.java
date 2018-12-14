package studycave.application.groups;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studycave.application.files.Material;
import studycave.application.flashcard.Set;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.test.Test;

public interface GroupRepository extends JpaRepository<StudyGroup, Long> {

	List<StudyGroup> findByName(String name);

	List<StudyGroup> findByGroupKey(String groupKey);
	
	@Query("select t from Test t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'UNVERIFIED' )")
	List<Test> findTestByGroupKey(@Param("g") Long g);
	
	@Query("select t from Flashcardset t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'UNVERIFIED' )")
	List<Set> findSetByGroupKey(@Param("g") Long g);
	
	@Query("select t from Material t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'UNVERIFIED' )")
	List<Material> findMaterialByGroupKey(@Param("g") Long g);
	
	
}