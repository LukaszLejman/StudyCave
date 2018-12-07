package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;

import studycave.application.user.SimpleUserInfo;

public class GroupInfoDto {
	private Long id;
	private String owner;
	private String name;
	private String description;
	private String groupKey;
	List<SimpleUserInfo> users = new ArrayList<>();
	
	public GroupInfoDto() {
		
	}
	
	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getGroupKey() {
		return groupKey;
	}
	public void setGroupKey(String groupKey) {
		this.groupKey = groupKey;
	}
	public List<SimpleUserInfo> getUsers() {
		return users;
	}
	public void setUsers(List<SimpleUserInfo> users) {
		this.users = users;
	}
	
}
