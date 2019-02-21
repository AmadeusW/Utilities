using System;
using System.Collections.Generic;
using System.Text;

namespace JekyllToHugoConverter
{
    class Art
    {
        public string Internal { get; }
        public string Title { get; set; }= string.Empty;
        public string Description { get; set; }= string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Tags { get; set; } = string.Empty;

        public string ToMd()
        {
            return $@"+++
image = ""{Url}""
title = ""{Title}""
weight = 0
description = ""{Description}""
availability = """"
tags = [{Tags}]
+++
";
        }

        public Art(string @internal)
        {
            Internal = @internal;
        }

        public void AddTag(string tag)
        {
            if (string.IsNullOrEmpty(tag))
            {
                return;
            }
            if (string.IsNullOrEmpty(Tags))
            {
                Tags = $"\"{tag}\"";
                return;
            }
            else
            {
                Tags += $", \"{tag}\"";
                return;
            }
        }

        public override int GetHashCode()
        {
            return Internal.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (!(obj is Art otherArt))
                return false;

            return Internal.Equals(otherArt.Internal);
        }
    }
}
