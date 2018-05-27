package studycave.application;

import java.sql.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import studycave.application.user.User;
import studycave.application.user.UserRepository;


public class SetCreateDTO {
	
	@Autowired
    @ApiModelProperty(hidden = true)
	UserRepository userRepository;
	
    private String name;
    private String category;
    private String owner;
	@JsonIgnore
	private long idOwner;
	@JsonProperty("add_date")
    private Date addDate;
	@JsonProperty("edit_date")
    private Date editDate;
    private int grade;
    @ApiModelProperty(value = "Default value for note", required = true,example = "public") 
    private String permission;
    
    @OneToMany(fetch = FetchType.LAZY,mappedBy="flashcardSet",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<FlashcardSetCreateDTO> flashcards;

    protected SetCreateDTO() {
    }


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner=owner;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}
	
	public void setAddDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.addDate = sqlDate;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}
	
	public void setEditDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.editDate = sqlDate;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}


	public long getIdOwner() {
		return idOwner;
	}


	public void setIdOwner(long idOwner) {
		this.idOwner = idOwner;
	}


	public UserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}



	public List<FlashcardSetCreateDTO> getFlashcards() {
		return flashcards;
	}


	public void setFlashcards(List<FlashcardSetCreateDTO> flashcards) {
		this.flashcards = flashcards;
	}


	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}
}
