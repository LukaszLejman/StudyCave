package studycave.application.badges;
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
import studycave.application.user.UserBadge;

@Entity
public class Badge {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String iconPath;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "badge", cascade = CascadeType.ALL)
	List<UserBadge> users = new ArrayList<>();
	
	public Badge() {
		
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

	public String getIconPath() {
		return iconPath;
	}

	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}

	public List<UserBadge> getUsers() {
		return users;
	}

	public void setUsers(List<UserBadge> users) {
		this.users = users;
	}
	
	
}
