import {
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

export interface extendedAPICommand
  extends RESTPostAPIChatInputApplicationCommandsJSONBody {
  permissionRequired?: bigint | Array<bigint>;
  guildOnly?: Boolean;
  autocomplete?(
    interaction: AutocompleteInteraction
  ): Promise<Array<ApplicationCommandOptionChoiceData | string>>;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
}

export type CommunityResultsResponse = {
  data: {
    communityResults: {
      result: Community;
    };
  };
};

export type Community = {
  __typename: "Community";
  member_relationship_typeahead: MemberRelationshipTypeahead[];
};

export type MemberRelationshipTypeahead = {
  community_results: {
    rest_id: string;
  };
  role: string;
  user_results: {
    result: User;
  };
};

export type User = {
  __typename: "User";
  id: string;
  is_blue_verified: boolean;
  rest_id: string;
  avatar: {
    image_url: string;
  };
  dm_permissions: {
    can_dm: boolean;
  };
  media_permissions: {
    can_media_tag: boolean;
  };
  core: {
    name: string;
    screen_name: string;
  };
  identity_profile_labels_highlighted_label: Record<string, unknown>;
  privacy: {
    protected: boolean;
  };
  verification: {
    verified: boolean;
  };
};
