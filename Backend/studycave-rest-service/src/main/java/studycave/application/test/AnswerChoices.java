package studycave.application.test;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import springfox.documentation.annotations.ApiIgnore;

@Entity
public class AnswerChoices extends Answer {
	
	private String content; 

    @Column(name="is_good")
    @JsonProperty("is_good")
    private Boolean good;

    public AnswerChoices() {
    	super();
    }
    
	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}

	public Boolean getGood() {
		return good;
	}

	public void setGood(Boolean good) {
		this.good = good;
	}


  
}
