using System;
using astro_world_api.Dtos;
using astro_world_api.Persistance.Entities;
using AutoMapper;

namespace astro_world_api.Configs
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
          CreateMap<UserDto, User>();
        }
    }
}