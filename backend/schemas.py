from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

Status = Literal["submitted", "reviewed", "live"]


class Section(BaseModel):
    type: str
    fields: dict[str, Any]


class SiteConfig(BaseModel):
    # extra="allow" so client-side additions (e.g. style_brief) pass through to
    # storage untouched, without the backend needing to know their shape.
    model_config = ConfigDict(extra="allow")

    colors: dict[str, str]
    sections: list[Section]

    @field_validator("sections")
    @classmethod
    def sections_not_empty(cls, v: list[Section]) -> list[Section]:
        if not v:
            raise ValueError("sections must contain at least one section")
        return v


class SubmissionCreate(BaseModel):
    client_name: str = Field(min_length=1)
    client_email: EmailStr
    site_config: SiteConfig


class SubmissionCreated(BaseModel):
    id: int
    status: Status


class SubmissionSummary(BaseModel):
    id: int
    created_at: str
    client_name: str
    client_email: str
    status: Status


class SubmissionFull(SubmissionSummary):
    site_config: dict[str, Any]


class SubmissionStatusUpdate(BaseModel):
    status: Status
