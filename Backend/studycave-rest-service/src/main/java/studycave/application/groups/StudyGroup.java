package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import studycave.application.groups.members.StudyGroupMember;
@Entity
public class StudyGroup {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	private String name;
	
    @OneToMany(fetch = FetchType.LAZY,mappedBy="group",cascade = CascadeType.ALL)
    List<StudyGroupMember> members = new ArrayList<>();
    
	public StudyGroup() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<StudyGroupMember> getMembers() {
		return members;
	}

	public void setMembers(List<StudyGroupMember> members) {
		this.members = members;
	}
}
