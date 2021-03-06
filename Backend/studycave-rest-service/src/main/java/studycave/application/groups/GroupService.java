package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.text.RandomStringGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import studycave.application.badges.Badge;
import studycave.application.badges.BadgeRepository;
import studycave.application.files.Material;
import studycave.application.files.MaterialRepository;
import studycave.application.groups.dto.AddMaterialDto;
import studycave.application.flashcard.Flashcard;
import studycave.application.flashcard.Set;
import studycave.application.flashcard.SetRepository;
import studycave.application.groups.dto.AddSetDto;
import studycave.application.groups.dto.AddTestDto;
import studycave.application.groups.dto.VerifyDto;
import studycave.application.groups.members.SimpleStudyGroupMemberDTO;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.groups.members.StudyGroupMemberRepository;
import studycave.application.test.AnswerChoices;
import studycave.application.test.AnswerGaps;
import studycave.application.test.AnswerPairs;
import studycave.application.test.AnswerPuzzle;
import studycave.application.test.Question;
import studycave.application.test.QuestionChoices;
import studycave.application.test.QuestionGaps;
import studycave.application.test.QuestionPairs;
import studycave.application.test.QuestionPuzzle;
import studycave.application.test.Test;
import studycave.application.test.TestRepository;
import studycave.application.user.SimpleUserInfo;
import studycave.application.user.User;
import studycave.application.user.UserBadge;
import studycave.application.user.UserBadgeRepository;
import studycave.application.user.UserRepository;
import studycave.application.userActivity.UserActivity;
import studycave.application.userActivity.UserActivityService;
import studycave.application.files.Material;
import studycave.application.flashcard.Set;
import studycave.application.test.Test;
import studycave.application.test.TestRepository;
import studycave.application.test.result.TestResult;
import studycave.application.test.result.TestResultRepository;
import studycave.application.user.LeaderboardDTO;
import studycave.application.user.SimpleUserInfo;
import studycave.application.user.User;
import studycave.application.user.UserRepository;
import studycave.application.groups.comments.SimpleStudyGroupCommentDto;
import studycave.application.groups.comments.StudyGroupComment;
import studycave.application.groups.comments.StudyGroupCommentDto;
import studycave.application.groups.comments.StudyGroupCommentRepository;


@Service
public class GroupService {

	@Autowired
	ModelMapper modelMapper;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	MaterialRepository materialRepository;
	@Autowired
	StudyGroupMemberRepository memberRepository;
	@Autowired
	BadgeRepository badgeRepository;
	@Autowired
	UserBadgeRepository userBadgeRepository;
	@Autowired
	SetRepository setRepository;
  	@Autowired
	TestRepository testRepository;
    	@Autowired
  	TestResultRepository testResultRepository;
  	@Autowired
  	StudyGroupCommentRepository commentRepository;
  	@Autowired
  	UserActivityService userActivityService;

  	@PersistenceContext
	private EntityManager entityManager;

	public ResponseEntity<?> createGroup(CreateGroupDto groupDto) {
		StudyGroup group = modelMapper.map(groupDto, StudyGroup.class);
		RandomStringGenerator generator = new RandomStringGenerator.Builder().withinRange('0', 'z')
				.filteredBy(Character::isLetterOrDigit).build();

		String groupKey = generator.generate(10);

		while (!this.groupRepository.findByGroupKey(groupKey).isEmpty()) {
			groupKey = generator.generate(10);
		}
		;
		group.setGroupKey(groupKey);
		Optional<User> owner = this.userRepository.findByUsername(groupDto.getOwner());
		if (!owner.isPresent()) {
			return new ResponseEntity<>("Invalid Owner", HttpStatus.BAD_REQUEST);
		}

		List<StudyGroupMember> members = new ArrayList<>();
		StudyGroupMember member = new StudyGroupMember();
		member.setUser(owner.get());
		member.setIsGroupLeader(true);
		member.setGroup(group);
		members.add(member);
		group.setMembers(members);

		group = this.groupRepository.save(group);
		GroupDto createdGroupDto = modelMapper.map(group, GroupDto.class);
		createdGroupDto.setKey(group.getGroupKey());
		createdGroupDto.setOwner(group.getMembers().get(0).getUser().getUsername());
	// Badge for creating first group
		if(userBadgeRepository.findByIdAndUser((long)2, owner.orElse(null).getId()).isEmpty()) {
		UserBadge badgeAchieved = new UserBadge();
		Badge badge = new Badge();
		badge = badgeRepository.findById((long)2).orElse(null);
		badgeAchieved.setBadge(badge);
		badgeAchieved.setUser(owner.orElse(null));
		userBadgeRepository.save(badgeAchieved);
		}
		
		return new ResponseEntity<GroupDto>(createdGroupDto, HttpStatus.OK);
	}

	public GroupInfoDto getGroupInfo(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		GroupInfoDto groupInfo = new GroupInfoDto();
		groupInfo.setId(group.getId());
		groupInfo.setName(group.getName());
		groupInfo.setDescription(group.getDescription());
		groupInfo.setGroupKey(group.getGroupKey());
		List<SimpleUserInfo> users = new ArrayList<>();
		for (StudyGroupMember m : group.getMembers()) {
			if (m.getIsGroupLeader() != true) {
				SimpleUserInfo u = new SimpleUserInfo();
				u.setId(m.getUser().getId());
				u.setUsername(m.getUser().getUsername());
				users.add(u);
			}
			else
			groupInfo.setOwner(m.getUser().getUsername());
		}
		groupInfo.setUsers(users);
		return groupInfo;
	}

	public ResponseEntity deleteUserFromGroup(Long gId, Long pId) {
		StudyGroupMember user = new StudyGroupMember();
		user = this.memberRepository.findUserInGroup(gId, pId);
		this.memberRepository.delete(user);
		return new ResponseEntity(HttpStatus.OK);

	}

	public ResponseEntity deleteGroup(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		for (StudyGroupMember m : group.getMembers()) {
			this.memberRepository.delete(m);
		}
		this.groupRepository.delete(group);
		return new ResponseEntity(HttpStatus.OK);
	}

	public ResponseEntity<?> generateCode(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		RandomStringGenerator generator = new RandomStringGenerator.Builder().withinRange('0', 'z')
				.filteredBy(Character::isLetterOrDigit).build();

		String groupKey = generator.generate(10);

		while (!this.groupRepository.findByGroupKey(groupKey).isEmpty()) {
			groupKey = generator.generate(10);
		}

		group.setGroupKey(groupKey);
		this.groupRepository.save(group);
		return new ResponseEntity<>(groupKey, HttpStatus.OK);
	}

	public List<SimpleStudyGroupMemberDTO> getMyGroups(Long id) {
		// User user = new User();
		// user = this.userRepository.findByUsername(username).orElse(null);
		List<StudyGroupMember> groups = new ArrayList<>();
		groups = this.memberRepository.findByMember(id);
		List<SimpleStudyGroupMemberDTO> simplegroups = new ArrayList<>();
		for (StudyGroupMember g : groups) {
			SimpleStudyGroupMemberDTO s = new SimpleStudyGroupMemberDTO();
			s.setName(g.getGroup().getName());
			s.setId(g.getGroup().getId());
			if (g.getIsGroupLeader() == true)
				s.setRole("OWNER");
			else
				s.setRole("MEMBER");
			simplegroups.add(s);
		}
		return simplegroups;
	}

	public ResponseEntity<?> joinToGroup(Long userId, String groupCode) {
		List<StudyGroup> groups = this.groupRepository.findByGroupKey(groupCode);

		if (groups.isEmpty()) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}

		for (StudyGroup group : groups) {
			if (group.getGroupKey().equals(groupCode)) {
				for (StudyGroupMember member : group.getMembers()) {
					if (member.getUser().getId() == userId) {
						return new ResponseEntity<>("Użytkownik znajduje się już w grupie", HttpStatus.CONFLICT);
					}
				}
				StudyGroupMember newMember = new StudyGroupMember();
				newMember.setIsGroupLeader(false);
				newMember.setGroup(group);
				newMember.setUser(this.userRepository.findById(userId).orElse(null));
				this.memberRepository.save(newMember);
				GroupDto groupDto = modelMapper.map(group, GroupDto.class);
				
			// Badge for joining first group
				if(userBadgeRepository.findByIdAndUser((long)3, userId).isEmpty()) {
				UserBadge badgeAchieved = new UserBadge();
				Badge badge = new Badge();
				badge = badgeRepository.findById((long)3).orElse(null);
				badgeAchieved.setBadge(badge);
				badgeAchieved.setUser(userRepository.findById(userId).orElse(null));
				userBadgeRepository.save(badgeAchieved);
				}
				
				return new ResponseEntity<GroupDto>(groupDto, HttpStatus.OK);
			}
		}

		return new ResponseEntity<>("Niepoprawny kod", HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<?> addFlashcardSets(String groupId, @RequestBody List<AddSetDto> setIds) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();

		if (group == null) 	{
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		for (AddSetDto s : setIds) {
				Long setId = Long.parseLong(s.getSetId());
				this.setRepository.findById(setId).ifPresent(set -> {
					List<Flashcard> flashcards = set.getFlashcards();
					for (Flashcard flashcard : flashcards) {
						entityManager.detach(flashcard);
						flashcard.setId(null);
					}
					entityManager.detach(set);
					set.setId(null);
					set.setPermission("GROUP");
					set.setStatus("UNVERIFIED");
					set.setGroup(group);
					this.setRepository.save(set);
					this.userActivityService.saveActivity("addedResource", 0, null, user, null, group, null, set, null);
				});
			}
		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}
	

	public ResponseEntity<?> addMaterials(String groupId, @RequestBody List<AddMaterialDto> materialIds) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		
		if (group == null) 	{
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
  		for (AddMaterialDto m : materialIds) {
				Long materialId = Long.parseLong(m.getMaterialId());
				this.materialRepository.findById(materialId).ifPresent(material -> {
					entityManager.detach(material);
					material.setId(null);
					material.setPermission("GROUP");
					material.setStatus("UNVERIFIED");
					material.setGroup(group);
					this.materialRepository.save(material);
					this.userActivityService.saveActivity("addedResource", 0, null, user, null, group, material, null, null);
				});
		}
		return new ResponseEntity<>("Dodano", HttpStatus.OK);
  }
  
	public ResponseEntity<?> addTests(String groupId, @RequestBody List<AddTestDto> testIds) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		
		if (group == null) 	{
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		for (AddTestDto t : testIds) {
				Long testId = Long.parseLong(t.getTestId());
				this.testRepository.findById(testId).ifPresent(test -> {
					List<Question> questions = test.getQuestions();
					for (Question question : questions) {
						if (question instanceof QuestionChoices) {
							for (AnswerChoices answer : ((QuestionChoices) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						if (question instanceof QuestionPairs) {
							for (AnswerPairs answer : ((QuestionPairs) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						if (question instanceof QuestionPuzzle) {
							for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						if (question instanceof QuestionGaps) {
							for (AnswerGaps answer : ((QuestionGaps) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						entityManager.detach(question);
						question.setId(null);
					}
					entityManager.detach(test);
					test.setId(null);
					test.setPermission("GROUP");
					test.setStatus("UNVERIFIED");
					test.setGroup(group);
					this.testRepository.save(test);
					this.userActivityService.saveActivity("addedResource", 0, null, user, null, group, null, null, test);
				});
			}

		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}
  

  public ResponseEntity<?> getContent(Long group_id, String type) {
		List<ContentDto> contents = new ArrayList<>();
		
		switch (type){
			case "tests":
				List<Test> tests = new ArrayList<>();
				tests = this.testRepository.findTestByGroup(group_id);
				for (Test t : tests) {
					ContentDto contentTest = new ContentDto();
					contentTest.setId(t.getId());
					contentTest.setOwner((userRepository.findById(t.getIdOwner()).orElse(null)).getUsername());
					contentTest.setAddDate();
					contentTest.setGrade((long) 0);
					contentTest.setTitle(t.getTitle());	
					contents.add(contentTest);
				}

					return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
			case "materials":
				List<Material> materials = new ArrayList<>();
				materials = this.materialRepository.findMaterialByGroup(group_id);
				for (Material m : materials ) {
					ContentDto contentMaterial = new ContentDto();
					contentMaterial.setId(m.getId());
					contentMaterial.setOwner((userRepository.findById((long)m.getOwner()).orElse(null)).getUsername());
					contentMaterial.setAddDate();
					contentMaterial.setGrade((long) 0);
					contentMaterial.setTitle(m.getTitle());
					contents.add(contentMaterial);
				}

					return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
			case "flashcardsets":
				List<Set> sets = new ArrayList<>();
				sets = this.setRepository.findSetByGroup(group_id);
				for (Set s : sets) {
					ContentDto contentSet = new ContentDto();
					contentSet.setId(s.getId());
					contentSet.setOwner((userRepository.findById((long)s.getIdOwner()).orElse(null)).getUsername());
					contentSet.setAddDate();
					contentSet.setGrade((long) 0);
					contentSet.setTitle(s.getName());
					contents.add(contentSet);
				}

					return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
			default:
				return new ResponseEntity<>("Błąd w zapytaniu", HttpStatus.BAD_REQUEST);
		}
		
	}

	public ResponseEntity<?> getUnverifiedContent(Long group_id, String type){
		List<ContentDto> contents = new ArrayList<>();
		
		switch (type){
		case "tests":
			List<Test> tests = new ArrayList<>();
			tests = this.testRepository.findWaitingTestByGroupKey(group_id);
			for (Test t : tests) {
				ContentDto content = new ContentDto();
				content.setId(t.getId());
				content.setOwner((userRepository.findById(t.getIdOwner()).orElse(null)).getUsername());
				content.setAddDate();
				content.setGrade((long) 0);
				content.setTitle(t.getTitle());	
				contents.add(content);
			}
				return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
		case "materials":
			List<Material> materials = new ArrayList<>();
			materials = this.materialRepository.findWaitingMaterialByGroupKey(group_id);
			for (Material m : materials ) {
				ContentDto content = new ContentDto();
				content.setId(m.getId());
				content.setOwner((userRepository.findById((long)m.getOwner()).orElse(null)).getUsername());
				content.setAddDate();
				content.setGrade((long) 0);
				content.setTitle(m.getTitle());
				contents.add(content);
			}
				return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
		case "flashcards":
			List<Set> sets = new ArrayList<>();
			sets = this.setRepository.findWaitingSetByGroupKey(group_id);
			for (Set s : sets) {
				ContentDto content = new ContentDto();
				content.setId(s.getId());
				content.setOwner((userRepository.findById((long)s.getIdOwner()).orElse(null)).getUsername());
				content.setAddDate();
				content.setGrade((long) 0);
				content.setTitle(s.getName());
				contents.add(content);
			}
				return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
		default:
			return new ResponseEntity<>("Błąd w zapytaniu", HttpStatus.BAD_REQUEST);
		}
	}

		public ResponseEntity<?> acceptTest(String groupId, String testId, VerifyDto dto) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		Test test = this.testRepository.getOne(Long.parseLong(testId));
		test.setPermission("GROUP");
		test.setStatus("VERIFIED");
		this.testRepository.save(test);

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		User toUser = new User();
		toUser.setId(Long.valueOf(test.getIdOwner()));
		this.userActivityService.saveActivity("acceptedResource", dto.getPoints(), dto.getComment(), toUser, user, group, null, null, test);
		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}

	public ResponseEntity<?> acceptSet(String groupId, String setId, VerifyDto dto) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		Set set = this.setRepository.findById(Long.parseLong(setId)).orElse(null);
		if (set == null) {
			return new ResponseEntity<>("Nie znaleziono zestawu", HttpStatus.NOT_FOUND);
		}
		set.setPermission("GROUP");
		set.setStatus("VERIFIED");
		this.setRepository.save(set);

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		User toUser = new User();
		toUser.setId(Long.valueOf(set.getIdOwner()));
		this.userActivityService.saveActivity("acceptedResource", dto.getPoints(), dto.getComment(), toUser, user, group, null, set, null);
		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}

	public ResponseEntity<?> acceptMaterial(String groupId, String materialId, VerifyDto dto) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		Material material = this.materialRepository.findById(Long.parseLong(materialId)).orElse(null);
		if (material == null) {
			return new ResponseEntity<>("Nie znaleziono materiału", HttpStatus.NOT_FOUND);
		}
		material.setPermission("GROUP");
		material.setStatus("VERIFIED");
		this.materialRepository.save(material);

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		User toUser = new User();
		toUser.setId(Long.valueOf(material.getOwner()));
		this.userActivityService.saveActivity("acceptedResource", dto.getPoints(), dto.getComment(), toUser, user, group, material, null, null);
		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}
	
	public ResponseEntity<?> rejectTest(String groupId, String testId, VerifyDto dto) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		Test test = this.testRepository.getOne(Long.parseLong(testId));
		
		test.setPermission("GROUP");
		test.setStatus("REJECTED");
		this.testRepository.save(test);
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		User toUser = new User();
		toUser.setId(Long.valueOf(test.getIdOwner()));
		this.userActivityService.saveActivity("rejectedResource", dto.getPoints(), dto.getComment(), toUser, user, group, null, null, test);
		return new ResponseEntity<>("Usunięto", HttpStatus.OK);
	}

	public ResponseEntity<?> rejectSet(String groupId, String setId, VerifyDto dto) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		Set set = this.setRepository.findById(Long.parseLong(setId)).orElse(null);
		if (set == null) {
			return new ResponseEntity<>("Nie znaleziono zestawu", HttpStatus.NOT_FOUND);
		}

		set.setPermission("GROUP");
		set.setStatus("REJECTED");
		this.setRepository.save(set);
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		User toUser = new User();
		toUser.setId(Long.valueOf(set.getIdOwner()));
		this.userActivityService.saveActivity("rejectedResource", dto.getPoints(), dto.getComment(), toUser, user, group, null, set, null);
		return new ResponseEntity<>("Usunięto", HttpStatus.OK);
	}

	public ResponseEntity<?> rejectMaterial(String groupId, String materialId, VerifyDto dto) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		Material material = this.materialRepository.findById(Long.parseLong(materialId)).orElse(null);
		if (material == null) {
			return new ResponseEntity<>("Nie znaleziono materiału", HttpStatus.NOT_FOUND);
		}
		
		material.setPermission("GROUP");
		material.setStatus("REJECTED");
		this.materialRepository.save(material);
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByUsername(authentication.getName()).get();
		User toUser = new User();
		toUser.setId(Long.valueOf(material.getOwner()));
		this.userActivityService.saveActivity("rejectedResource", dto.getPoints(), dto.getComment(), toUser, user, group, material, null, null);
		return new ResponseEntity<>("Usunięto", HttpStatus.OK);
	}

	public ResponseEntity<?> getComments(String type, Long content_id) {
		List<StudyGroupCommentDto> comments = new ArrayList<>();	
		for(StudyGroupComment c : this.commentRepository.findCommentsByContent(type, content_id)) {
		StudyGroupCommentDto comment = new StudyGroupCommentDto();
		comment.setId(c.getId());
		comment.setText(c.getText());
		comment.setUsername((this.userRepository.findById(c.getUserId()).orElse(null)).getUsername());
		System.out.println(comment);
		comments.add(comment);
		}
		return new ResponseEntity<List<StudyGroupCommentDto>>(comments, HttpStatus.OK);
	}
	
	public ResponseEntity<?> addComment(String type, Long content_id, SimpleStudyGroupCommentDto text) {
		StudyGroupComment comment = new StudyGroupComment();
		comment.setContentType(type);
		comment.setContentId(content_id);
		comment.setText(text.getText());
		comment.setUserId((this.userRepository.findByUsername(text.getUsername()).orElse(null)).getId());
		this.commentRepository.save(comment);
		if(userBadgeRepository.findByIdAndUser((long)7, (this.userRepository.findByUsername(text.getUsername()).orElse(null)).getId()).isEmpty()) {
			UserBadge badgeAchieved = new UserBadge();
			Badge badge = new Badge();
			badge = badgeRepository.findById((long)7).orElse(null);
			badgeAchieved.setBadge(badge);
			badgeAchieved.setUser(this.userRepository.findByUsername(text.getUsername()).orElse(null));
			userBadgeRepository.save(badgeAchieved);
		}
		return new ResponseEntity<>("Dodano komentarz", HttpStatus.OK);
	}
	
	public ResponseEntity<?> deleteComment(Long comment_id) {
		this.commentRepository.deleteById(comment_id);
		return new ResponseEntity<>("Usunięto komentarz", HttpStatus.OK);
	}
	
	public ResponseEntity<?> deleteContent(Long group_id, String type, Long content_id){
		switch (type) {
		case "tests":
			Test test = this.testRepository.findById(content_id).orElse(null);
			if (test == null) {
				return new ResponseEntity<>("Nie znaleziono", HttpStatus.NOT_FOUND);
			}
			test.setStatus("DELETED");
			this.testRepository.save(test);
			return new ResponseEntity<>("Usunięto", HttpStatus.OK);
		case "materials":
			Material material = this.materialRepository.findById(content_id).orElse(null);
			if (material == null) {
				return new ResponseEntity<>("Nie znaleziono", HttpStatus.NOT_FOUND);
			}
			material.setStatus("DELETED");
			this.materialRepository.save(material);
			return new ResponseEntity<>("Usunięto", HttpStatus.OK);
		case "sets":
			Set set = this.setRepository.findById(content_id).orElse(null);
			if (set == null) {
				return new ResponseEntity<>("Nie znaleziono", HttpStatus.NOT_FOUND);
			}
			set.setStatus("DELETED");
			this.setRepository.save(set);
			return new ResponseEntity<>("Usunięto", HttpStatus.OK);
		default:
			return new ResponseEntity<>("Błąd zapytania", HttpStatus.BAD_REQUEST);
		}
	}
  
  public ResponseEntity<?> getGroupLeaderboard(Long group_id){
		StudyGroup group = this.groupRepository.findById(group_id).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		List<LeaderboardDTO> leaderboard = new ArrayList<>();
		for(StudyGroupMember m : group.getMembers()) {
			if(!m.getIsGroupLeader()) {
				float score = 0;
				LeaderboardDTO user = new LeaderboardDTO();
				for (UserActivity a : m.getUser().getActivityTo()) {
					score += a.getPoints();
				}
				user.setUsername(m.getUser().getUsername());
				if(userBadgeRepository.findByIdAndUser((long)8, m.getUser().getId()).isEmpty() && score > 100) {
					UserBadge badgeAchieved = new UserBadge();
					Badge badge = new Badge();
					badge = badgeRepository.findById((long)8).orElse(null);
					badgeAchieved.setBadge(badge);
					badgeAchieved.setUser(m.getUser());
					userBadgeRepository.save(badgeAchieved);
				}
				if(userBadgeRepository.findByIdAndUser((long)12, m.getUser().getId()).isEmpty() && score > 250) {
					UserBadge badgeAchieved = new UserBadge();
					Badge badge = new Badge();
					badge = badgeRepository.findById((long)12).orElse(null);
					badgeAchieved.setBadge(badge);
					badgeAchieved.setUser(m.getUser());
					userBadgeRepository.save(badgeAchieved);
				}
				user.setPoints(score);
				leaderboard.add(user);
			}
		}
		return new ResponseEntity<List<LeaderboardDTO>>(leaderboard,HttpStatus.OK);
	}
	
	public ResponseEntity<?> getGroupTestLeaderboard(Long group_id){
		StudyGroup group = this.groupRepository.findById(group_id).orElse(null);
		if (group == null) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		List<LeaderboardDTO> leaderboard = new ArrayList<>();
		for(StudyGroupMember m : group.getMembers()) {
			if(!m.getIsGroupLeader()) {
				float score = 0;
				LeaderboardDTO user = new LeaderboardDTO();
				for (UserActivity a : m.getUser().getActivityTo()) {
					if(a.getType() == "solvedTest")
					score += a.getPoints();
				}
				user.setUsername(m.getUser().getUsername());
				user.setPoints(score);
				leaderboard.add(user);
		}
		// leaderboard.sort((o1, o2) -> Integer.toString(o1.getPoints()).compareTo(Integer.toString(o2.getPoints())));
		}
		return new ResponseEntity<List<LeaderboardDTO>>(leaderboard,HttpStatus.OK);
	}

}
