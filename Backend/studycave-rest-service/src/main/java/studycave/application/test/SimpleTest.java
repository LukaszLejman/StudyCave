package studycave.application.test;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "test")
public class SimpleTest {
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(name="id_owner")
    @JsonProperty("owner")
    private Long idOwner;
    @Column(name="add_date")
    @JsonProperty("add_date")
    private Date addDate;
    @Column(name="edit_date")
    @JsonProperty("edit_date")
    private Date editDate;
    //@Column(nullable = true)
    private int grade;
    private String permission;
    @Column(name="group_id")
    @JsonInclude(JsonInclude.Include.NON_NULL) 
    private Integer groupId;
    
    protected SimpleTest() {
    	
    }
    
    public SimpleTest(String title,Long idOwner) {
    	super();
    	this.title = title;
    	this.idOwner = idOwner; 	
    }
    
    public SimpleTest(Test test) {
    	super();
    	this.title = test.getTitle();
    	this.idOwner = test.getIdOwner();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getIdOwner() {
		return idOwner;
	}

	public void setIdOwner(Long idOwner) {
		this.idOwner = idOwner;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
}
