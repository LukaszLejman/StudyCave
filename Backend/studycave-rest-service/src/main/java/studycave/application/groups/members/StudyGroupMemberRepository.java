package studycave.application.groups.members;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import studycave.application.test.SimpleTest;

public interface StudyGroupMemberRepository extends JpaRepository<StudyGroupMember, Long> {
	
  @Query("select t from StudyGroupMember t where t.user.id = :i")
	List<StudyGroupMember> findByMember(@Param("i") Long i);

    
  @Query("select t from StudyGroupMember t where (t.group.id = :g and t.user.id = :u)")
  StudyGroupMember findUserInGroup(@Param("g") Long g, @Param("u") Long u);
    
}
