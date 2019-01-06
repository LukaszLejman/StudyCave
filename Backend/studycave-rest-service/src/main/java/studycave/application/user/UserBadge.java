package studycave.application.user;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import studycave.application.badges.Badge;


@Entity
public class UserBadge {
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
    @ManyToOne
    @JoinColumn(name="badge_id",referencedColumnName="id")
    private Badge badge;
    
    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName="id")
    private User user;
    
    public UserBadge() {
    	
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Badge getBadge() {
		return badge;
	}

	public void setBadge(Badge badge) {
		this.badge = badge;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
    
}
