import { Model } from '@react3l/react3l/core';
import { CodeGeneratorRule } from 'models/CodeGeneratorRule';
import { EntityComponent } from 'models/EntityComponent';

export class CodeGeneratorRuleEntityComponentMapping extends Model
{
    public codeGeneratorRuleId?: number;

    public entityComponentId?: number;

    public sequence?: number;

    public value?: string;


    public codeGeneratorRule?: CodeGeneratorRule;

    public entityComponent?: EntityComponent;
}
