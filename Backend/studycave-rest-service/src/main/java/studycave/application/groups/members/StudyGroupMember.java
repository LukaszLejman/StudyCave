package studycave.application.groups.members;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import studycave.application.groups.StudyGroup;
import studycave.application.user.User;


@Entity
public class StudyGroupMember {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

    @ManyToOne
    @JoinColumn(name="group_id",referencedColumnName="id")
    private StudyGroup group;
    
    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName="id")
    private User user;
    
    @Column(name="is_group_leader")
    private Boolean isGroupLeader;

    
	public StudyGroupMember() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public StudyGroup getGroup() {
		return group;
	}

	public void setGroup(StudyGroup group) {
		this.group = group;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Boolean getIsGroupLeader() {
		return isGroupLeader;
	}

	public void setIsGroupLeader(Boolean isGroupLeader) {
		this.isGroupLeader = isGroupLeader;
	}
    
}
